import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { groupSponsors } from '@/data/sponsors';

const sizeStyles = {
  main:    { grid: 'grid-cols-1 md:grid-cols-2',                  cell: 'h-32',  text: 'text-2xl' },
  support: { grid: 'grid-cols-2 md:grid-cols-4',                  cell: 'h-24',  text: 'text-base' },
  small:   { grid: 'grid-cols-3 md:grid-cols-6',                  cell: 'h-20',  text: 'text-sm' }
};

export function SponsorsSection() {
  const groups = groupSponsors();

  return (
    <section id="sponsors" className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Sponsorlar & Partnerler"
            title="Bu yolculuğu birlikte"
            gradient="inşa ediyoruz."
            className="mb-16"
          />
        </RevealOnScroll>

        {/* Main sponsors — büyük kareler */}
        {groups.main.length > 0 && (
          <RevealOnScroll>
            <div className={`grid ${sizeStyles.main.grid} gap-5 mb-6`}>
              {groups.main.map(s => <SponsorCell key={s.id} sponsor={s} size="main" />)}
            </div>
          </RevealOnScroll>
        )}

        {/* Support sponsors */}
        {groups.support.length > 0 && (
          <RevealOnScroll>
            <div className={`grid ${sizeStyles.support.grid} gap-5 mb-6`}>
              {groups.support.map(s => <SponsorCell key={s.id} sponsor={s} size="support" />)}
            </div>
          </RevealOnScroll>
        )}

        {/* Small partners */}
        {groups.small.length > 0 && (
          <RevealOnScroll>
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
      className={`hf-glass hf-glass-hover ${s.cell} flex items-center justify-center`}
    >
      {sponsor.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className="max-h-[60%] max-w-[70%] object-contain opacity-90"
        />
      ) : (
        <div className={`font-display font-bold text-white/40 ${s.text}`}>
          {sponsor.name}
        </div>
      )}
    </Wrapper>
  );
}
