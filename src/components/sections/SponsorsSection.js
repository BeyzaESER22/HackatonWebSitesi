import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { groupSponsors } from '@/data/sponsors';

const sizeStyles = {
  main:    { grid: 'grid-cols-1',                                     cell: 'min-h-[200px] md:min-h-[240px]', imgMax: 'max-h-[120px] md:max-h-[160px] max-w-[80%]',  text: 'text-2xl' },
  support: { grid: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3',       cell: 'min-h-[140px] md:min-h-[170px]', imgMax: 'max-h-[80px] md:max-h-[100px] max-w-[75%]',   text: 'text-base' },
  small:   { grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',       cell: 'min-h-[100px] md:min-h-[120px]', imgMax: 'max-h-[50px] md:max-h-[70px] max-w-[70%]',    text: 'text-sm' }
};

const tierLabels = {
  main:    'Ana Sponsor',
  support: 'Destekçi Sponsorlar',
  small:   'Partnerler'
};

export function SponsorsSection() {
  const groups = groupSponsors();

  return (
    <section id="sponsors" className="relative z-10 py-12 lg:py-24 border-t border-white/5">
      <Container>
        {/* Main sponsors — büyük kart */}
        {groups.main.length > 0 && (
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim font-medium">{tierLabels.main}</span>
            </div>
            <div className={`grid ${sizeStyles.main.grid} gap-5 mb-12`}>
              {groups.main.map(s => <SponsorCell key={s.id} sponsor={s} size="main" />)}
            </div>
          </RevealOnScroll>
        )}

        {/* Support sponsors */}
        {groups.support.length > 0 && (
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim font-medium">{tierLabels.support}</span>
            </div>
            <div className={`grid ${sizeStyles.support.grid} gap-5 mb-12`}>
              {groups.support.map(s => <SponsorCell key={s.id} sponsor={s} size="support" />)}
            </div>
          </RevealOnScroll>
        )}

        {/* Small partners */}
        {groups.small.length > 0 && (
          <RevealOnScroll>
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-dim font-medium">{tierLabels.small}</span>
            </div>
            <div className={`grid ${sizeStyles.small.grid} gap-5`}>
              {groups.small.map(s => <SponsorCell key={s.id} sponsor={s} size="small" />)}
            </div>
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}

function SponsorCell({ sponsor, size }) {
  const s = sizeStyles[size];
  const Wrapper = sponsor.url && sponsor.url !== '#' ? 'a' : 'div';
  const wrapperProps = Wrapper === 'a'
    ? { href: sponsor.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`
        group relative rounded-2xl border border-white/[0.08]
        bg-gradient-to-br from-white/[0.05] to-white/[0.02]
        backdrop-blur-sm ${s.cell} flex items-center justify-center p-8
        transition-all duration-300 ease-out overflow-hidden
        hover:border-white/[0.15] hover:from-white/[0.08] hover:to-white/[0.04]
        hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

      {sponsor.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className={`${s.imgMax} w-auto object-contain relative z-10 rounded-lg transition-all duration-300 group-hover:scale-105`}
        />
      ) : (
        <div className={`font-display font-bold text-white/30 ${s.text} relative z-10`}>
          {sponsor.name}
        </div>
      )}

      {/* Sponsor name tooltip */}
      <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] text-white/40 font-medium tracking-wider">{sponsor.name}</span>
      </div>
    </Wrapper>
  );
}
