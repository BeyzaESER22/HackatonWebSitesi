import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { SITE, COLORS } from '@/lib/constants';

export function ContactSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container size="sm">
        <RevealOnScroll>
          <SectionTitle
            eyebrow="İletişim"
            title="Sorun mu var?"
            gradient="Bize ulaş."
            className="mb-12"
          />
        </RevealOnScroll>

        <div className="grid sm:grid-cols-3 gap-4">
          <RevealOnScroll>
            <ContactCard
              accent={COLORS.blue}
              icon={(<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l9 6 9-6M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" strokeLinejoin="round" /></svg>)}
              title="E-posta"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <ContactCard
              accent={COLORS.red}
              icon={(<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.5" /></svg>)}
              title="Konum"
              value={SITE.location.full}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <ContactCard
              accent={COLORS.yellow}
              icon={(<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>)}
              title="Tarih"
              value={SITE.eventDates}
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function ContactCard({ accent, icon, title, value, href }) {
  const content = (
    <Card hover className="h-full">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}26`, color: accent }}>
        {icon}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-1">{title}</div>
      <div className="text-sm font-medium break-words">{value}</div>
    </Card>
  );
  return href ? <a href={href}>{content}</a> : content;
}
