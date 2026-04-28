import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { PROJECT_CATEGORIES } from '@/lib/constants';

function categoryLabel(id) {
  return PROJECT_CATEGORIES.find(c => c.id === id)?.label || id;
}

export function ProjectCard({ project }) {
  const cover = project.image || null;
  const colors = project.coverColors || ['#4285F4', '#EA4335'];

  return (
    <Card hover className="!p-0 overflow-hidden h-full flex flex-col">
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
          >
            <div className="font-display font-bold text-3xl text-white/85 text-center px-6 leading-tight">
              {project.title.split(' — ')[0]}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.isSample && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 text-white border border-white/15 backdrop-blur">
              ★ Showcase
            </span>
          )}
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 text-white border border-white/15 backdrop-blur">
            {project.categoryLabel || categoryLabel(project.category)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="font-display text-lg font-semibold mb-1 line-clamp-2">{project.title}</div>
        <div className="text-xs text-ink-dim mb-3">{project.team?.name || project.teamName}</div>
        <p className="text-sm text-ink-dim line-clamp-3 mb-4 flex-1">{project.shortDescription}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(Array.isArray(project.techStack) ? project.techStack : String(project.techStack || '').split(',')).slice(0, 4).map((t, i) => (
            <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.04] border border-white/10 text-ink-dim">
              {String(t).trim()}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-3 text-xs">
          <Link href={`/projects/${project.id}`} className="text-ink hover:text-google-blue transition font-medium">
            Detayları gör →
          </Link>
          <span className="ml-auto flex items-center gap-2 text-ink-dim">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.47 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" /></svg>
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo" className="hover:text-white">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 3h7v7M21 3l-9 9M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
}
