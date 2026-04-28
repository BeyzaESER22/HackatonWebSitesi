import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ProjectSubmissionSchema } from '@/lib/validations';
import { readStore, appendToStore } from '@/lib/store';
import { generateId, safeFilename, slugify } from '@/lib/helpers';
import { UPLOAD_LIMITS, PROJECT_CATEGORIES } from '@/lib/constants';
import { getStaticProjects } from '@/data/projects';

export const runtime = 'nodejs';

const IMG_DIR  = path.join(process.cwd(), 'public', 'uploads', 'projects', 'images');
const FILE_DIR = path.join(process.cwd(), 'public', 'uploads', 'projects', 'files');

/** GET — list approved projects (static showcase + approved submissions). */
export async function GET() {
  const staticOnes = getStaticProjects();
  let userOnes = [];
  try {
    const all = await readStore('projects.json');
    userOnes = all.filter(p => p.status === 'approved');
  } catch {
    userOnes = [];
  }
  const merged = [...staticOnes, ...userOnes].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  return NextResponse.json({ ok: true, projects: merged });
}

/** POST — accept new project submission with image (required) + zip (optional). */
export async function POST(request) {
  let formData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ message: 'Form verisi okunamadı.' }, { status: 400 }); }

  // Pull text fields
  const text = (k) => {
    const v = formData.get(k);
    return typeof v === 'string' ? v.trim() : '';
  };

  const payload = {
    title:           text('title'),
    category:        text('category'),
    shortDescription: text('shortDescription'),
    longDescription:  text('longDescription'),
    teamName:        text('teamName'),
    teamMembers:     text('teamMembers'),
    techStack:       text('techStack'),
    contactEmail:    text('contactEmail'),
    githubUrl:       text('githubUrl'),
    demoUrl:         text('demoUrl')
  };

  const parsed = ProjectSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const p = issue.path[0];
      if (p && !fieldErrors[p]) fieldErrors[p] = issue.message;
    });
    return NextResponse.json({ message: 'Geçersiz form verisi.', fieldErrors }, { status: 400 });
  }

  // Required image
  const imageFile = formData.get('image');
  if (!imageFile || typeof imageFile === 'string') {
    return NextResponse.json({ message: 'Ekran görüntüsü zorunludur.' }, { status: 400 });
  }
  const imgLimit = UPLOAD_LIMITS.projectImage;
  if (!imgLimit.types.includes(imageFile.type)) {
    return NextResponse.json({ message: `Geçersiz görsel tipi (${imageFile.type}).` }, { status: 400 });
  }
  if (imageFile.size > imgLimit.maxBytes) {
    return NextResponse.json({ message: `Görsel çok büyük (max ${imgLimit.maxBytes / 1024 / 1024}MB).` }, { status: 400 });
  }

  // Optional package
  const packageFile = formData.get('package');
  let packageMeta = null;
  if (packageFile && typeof packageFile !== 'string') {
    const fLimit = UPLOAD_LIMITS.projectFile;
    if (!fLimit.types.includes(packageFile.type)) {
      return NextResponse.json({ message: `Geçersiz paket tipi (${packageFile.type}). İzinli: zip, tar, gzip.` }, { status: 400 });
    }
    if (packageFile.size > fLimit.maxBytes) {
      return NextResponse.json({ message: `Paket çok büyük (max ${fLimit.maxBytes / 1024 / 1024}MB).` }, { status: 400 });
    }
    packageMeta = packageFile;
  }

  // Build identifiers
  const projectSlug = slugify(parsed.data.title) || 'project';
  const id = `proj_${projectSlug}_${Date.now().toString(36)}`;

  // Persist files
  let imageUrl = null;
  let packageUrl = null;

  try {
    await fs.mkdir(IMG_DIR, { recursive: true });
    const imgExt = (imageFile.name.split('.').pop() || 'jpg').toLowerCase();
    const imgName = safeFilename(`${id}.${imgExt}`);
    await fs.writeFile(path.join(IMG_DIR, imgName), Buffer.from(await imageFile.arrayBuffer()));
    imageUrl = `/uploads/projects/images/${imgName}`;

    if (packageMeta) {
      await fs.mkdir(FILE_DIR, { recursive: true });
      const fExt = (packageMeta.name.split('.').pop() || 'zip').toLowerCase();
      const fName = safeFilename(`${id}.${fExt}`);
      await fs.writeFile(path.join(FILE_DIR, fName), Buffer.from(await packageMeta.arrayBuffer()));
      packageUrl = `/uploads/projects/files/${fName}`;
    }
  } catch (err) {
    console.error('Project upload write error:', err);
    return NextResponse.json({ message: 'Dosyalar yazılamadı.' }, { status: 500 });
  }

  // Build record
  const categoryLabel = PROJECT_CATEGORIES.find(c => c.id === parsed.data.category)?.label || parsed.data.category;
  const teamMembers = parsed.data.teamMembers.split(/\r?\n/).map(line => {
    const parts = line.split(/\s*[-—|·]\s*/);
    return { name: parts[0]?.trim(), role: parts[1]?.trim() || '', university: parts[2]?.trim() || '' };
  }).filter(m => m.name);

  const record = {
    id,
    title:            parsed.data.title,
    category:         parsed.data.category,
    categoryLabel,
    shortDescription: parsed.data.shortDescription,
    longDescription:  parsed.data.longDescription,
    team: {
      name: parsed.data.teamName,
      members: teamMembers
    },
    techStack: parsed.data.techStack.split(',').map(s => s.trim()).filter(Boolean),
    contactEmail: parsed.data.contactEmail,
    githubUrl: parsed.data.githubUrl || null,
    demoUrl:   parsed.data.demoUrl   || null,
    image:     imageUrl,
    packageUrl,
    submittedAt: new Date().toISOString(),
    status: 'pending',
    isSample: false
  };

  try {
    await appendToStore('projects.json', record);
  } catch (err) {
    console.error('Project store write error:', err);
    return NextResponse.json({ message: 'Kayıt yazılamadı.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, project: { id: record.id, status: record.status } }, { status: 201 });
}
