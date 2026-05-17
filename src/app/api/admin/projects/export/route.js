import { isAdminRequestAuthenticated, unauthorizedJson } from '@/lib/admin-auth';
import { toCsv } from '@/lib/csv';
import { loadSubmittedProjects, sortNewestProjects } from '@/lib/projects';

export const runtime = 'nodejs';

function teamMembersText(project) {
  const members = project.team?.members || [];
  if (Array.isArray(members) && members.length > 0) {
    return members
      .map((member) => [member.name, member.role, member.university].filter(Boolean).join(' - '))
      .join('; ');
  }

  return project.teamMembers || '';
}

function techStackText(project) {
  if (Array.isArray(project.techStack)) {
    return project.techStack.join('; ');
  }

  return project.techStack || '';
}

export async function GET(request) {
  if (!isAdminRequestAuthenticated(request)) {
    return unauthorizedJson();
  }

  const items = sortNewestProjects(await loadSubmittedProjects({ includeRejected: true }));
  const rows = [
    [
      'ID',
      'Proje Adi',
      'Kategori',
      'Kisa Aciklama',
      'Detayli Aciklama',
      'Takim Adi',
      'Ekip Uyeleri',
      'Tech Stack',
      'Iletisim E-posta',
      'GitHub URL',
      'Demo URL',
      'Gorsel URL',
      'Durum',
      'Gonderim Tarihi',
      'Guncelleme Tarihi'
    ]
  ];

  for (const project of items) {
    rows.push([
      project.id,
      project.title,
      project.categoryLabel || project.category || '',
      project.shortDescription || '',
      project.longDescription || '',
      project.team?.name || project.teamName || '',
      teamMembersText(project),
      techStackText(project),
      project.contactEmail || '',
      project.githubUrl || '',
      project.demoUrl || '',
      project.image || '',
      project.status || 'pending',
      project.submittedAt || '',
      project.updatedAt || ''
    ]);
  }

  const csv = toCsv(rows);
  const fileName = `projects-${new Date().toISOString().slice(0, 10)}.csv`;

  return new Response(`\uFEFF${csv}`, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store'
    }
  });
}
