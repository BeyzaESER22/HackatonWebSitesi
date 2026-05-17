import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Badge } from '@/components/ui/Badge';
import { loadPublicProjects } from '@/lib/projects';
import { COLORS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projeler',
  description: 'HackFest\'26 AI Demo Day projeleri ve örnek showcase projemiz.',
  path: '/projects'
});

// Always render fresh — submissions can come in any time
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await loadPublicProjects();

  return (
    <section className="pt-36 pb-24 lg:pt-40 lg:pb-32">
      <Container>
        <div className="mb-10">
          <Badge dotColor={COLORS.green} className="mb-4">Demo Day Galerisi</Badge>
          <SectionTitle
            title="Geleceği kodlayan"
            gradient="projeler."
            align="left"
          />
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

        <div className="mt-12 hf-glass px-6 py-5 flex items-center justify-between gap-6 rounded-2xl"
             style={{ background: 'linear-gradient(120deg, rgba(66,133,244,.07), rgba(234,67,53,.05))' }}>
          <p className="text-sm text-ink-dim">Etkinlik sırasında geliştirdiğin projeyi gönder; onaylanınca bu galeride yer alsın.</p>
          <Button as={Link} href="/projects/submit" iconRight={<ArrowRightIcon />}>Başvur</Button>
        </div>
      </Container>
    </section>
  );
}
