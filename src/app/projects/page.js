import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Badge } from '@/components/ui/Badge';
import { getStaticProjects, sampleProjectId } from '@/data/projects';
import { readStore } from '@/lib/store';
import { PROJECT_CATEGORIES, COLORS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projeler',
  description: 'HackFest\'26 AI Demo Day projeleri ve örnek showcase projemiz.',
  path: '/projects'
});

// Always render fresh — submissions can come in any time
export const dynamic = 'force-dynamic';

async function loadAllProjects() {
  const staticOnes = getStaticProjects();

  let userOnes = [];
  try {
    const all = await readStore('projects.json');
    userOnes = all.filter(p => p.status === 'approved');
  } catch {
    userOnes = [];
  }

  // Showcase first, then newest submissions
  const sample = staticOnes.find(p => p.id === sampleProjectId);
  const others = staticOnes.filter(p => p.id !== sampleProjectId);
  const sortedUser = userOnes.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  return [sample, ...others, ...sortedUser].filter(Boolean);
}

export default async function ProjectsPage() {
  const projects = await loadAllProjects();

  return (
    <section className="pt-36 pb-24 lg:pt-40 lg:pb-32">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <Badge dotColor={COLORS.green} className="mb-4">Demo Day Galerisi</Badge>
            <SectionTitle
              title="Geleceği kodlayan"
              gradient="projeler."
              align="left"
            />
          </div>
          <p className="text-ink-dim max-w-md">
            Etkinlik süresince geliştirilen tüm onaylı projeler burada listelenir.
            Aşağıdaki <span className="text-white font-medium">★ Showcase</span> projesi referans olarak sergilenmektedir.
          </p>
        </div>

        {/* Categories filter strip — non-functional placeholder, can be wired with searchParams later */}
        <div className="flex flex-wrap gap-2 mb-10 text-xs">
          <Link href="/projects" className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">Tümü</Link>
          {PROJECT_CATEGORIES.map(c => (
            <span key={c.id} className="px-3 py-1.5 rounded-full border border-white/10 text-ink-dim">{c.label}</span>
          ))}
        </div>

        {projects.length === 0 ? (
          <Card className="text-center py-16">
            <div className="text-ink-dim mb-4">Henüz onaylı proje bulunmuyor.</div>
            <Button as={Link} href="/projects/submit" iconRight={<ArrowRightIcon />}>İlk projeyi sen gönder</Button>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}

        <div className="mt-16 hf-glass p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 rounded-3xl"
             style={{ background: 'linear-gradient(120deg, rgba(66,133,244,.08), rgba(234,67,53,.06))' }}>
          <div>
            <div className="font-display text-2xl font-bold mb-1">Demo Day Başvurusu</div>
            <p className="text-ink-dim text-sm max-w-2xl">
              Etkinlik sırasında geliştirdiğin projeyi yükle; onay sonrası bu galeride sergilensin ve tüm jüri & ziyaretçilere ulaşsın.
            </p>
          </div>
          <Button as={Link} href="/projects/submit" iconRight={<ArrowRightIcon />}>Hemen Başvur</Button>
        </div>
      </Container>
    </section>
  );
}
