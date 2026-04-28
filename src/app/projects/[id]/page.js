import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getStaticProjects } from '@/data/projects';
import { readStore } from '@/lib/store';
import { PROJECT_CATEGORIES, COLORS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

async function findProject(id) {
  const fromStatic = getStaticProjects().find(p => p.id === id);
  if (fromStatic) return fromStatic;

  try {
    const all = await readStore('projects.json');
    return all.find(p => p.id === id && p.status === 'approved') || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const project = await findProject(params.id);
  if (!project) return buildMetadata({ title: 'Proje bulunamadı', path: `/projects/${params.id}` });
  return buildMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${params.id}`
  });
}

export default async function ProjectDetailPage({ params }) {
  const project = await findProject(params.id);
  if (!project) notFound();

  const categoryLabel = project.categoryLabel || PROJECT_CATEGORIES.find(c => c.id === project.category)?.label || project.category;
  const techList = Array.isArray(project.techStack) ? project.techStack : String(project.techStack || '').split(',').map(s => s.trim()).filter(Boolean);
  const team = project.team || { name: project.teamName, members: parseTeamMembers(project.teamMembers) };
  const colors = project.coverColors || ['#4285F4', '#EA4335'];

  return (
    <article className="pt-36 pb-24 lg:pt-40 lg:pb-32">
      <Container>
        {/* Back nav */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-ink-dim hover:text-white mb-8 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Tüm Projeler
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          {/* Cover */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                  <div className="font-display font-bold text-4xl text-white/90 text-center px-8 leading-tight">
                    {project.title}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.isSample && <Badge dotColor={COLORS.yellow}>★ Showcase</Badge>}
              <Badge>{categoryLabel}</Badge>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4">
              {project.title}
            </h1>
            <p className="text-ink-dim text-lg mb-6">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.demoUrl && (
                <Button as="a" href={project.demoUrl} target="_blank" rel="noopener noreferrer" iconRight={<ArrowRightIcon />}>Canlı Demo</Button>
              )}
              {project.githubUrl && (
                <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="ghost"
                  iconLeft={(<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" /></svg>)}
                >GitHub</Button>
              )}
            </div>

            <Card className="!p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-3">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {techList.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">{t}</span>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Body grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold mb-4">Proje hakkında</h2>
            <p className="text-ink-dim leading-relaxed whitespace-pre-line">{project.longDescription}</p>

            {project.impact && (
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold mb-4">Etki</h3>
                <Card className="!p-6">
                  <div className="font-display text-2xl font-bold hf-text-gradient mb-3">{project.impact.headline}</div>
                  <ul className="space-y-2 text-sm text-ink-dim">
                    {project.impact.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COLORS.green }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {project.awards?.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold mb-4">Ödüller</h3>
                <div className="flex flex-wrap gap-2">
                  {project.awards.map((a, i) => (
                    <span key={i} className="text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <Card className="!p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-3">Ekip</div>
              <div className="font-display text-lg font-semibold mb-4">{team.name}</div>
              <ul className="space-y-3">
                {(team.members || []).map((m, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
                      {(m.name || '').slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm truncate">{m.name}</div>
                      <div className="text-xs text-ink-dim truncate">
                        {m.role}{m.university ? ` · ${m.university}` : ''}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function parseTeamMembers(text) {
  if (!text) return [];
  return String(text).split(/\r?\n/).map(line => {
    const parts = line.split(/\s*[-—|·]\s*/);
    return { name: parts[0]?.trim(), role: parts[1]?.trim() || '', university: parts[2]?.trim() || '' };
  }).filter(m => m.name);
}
