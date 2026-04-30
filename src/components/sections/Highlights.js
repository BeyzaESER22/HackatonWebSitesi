import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { highlights } from '@/data/highlights';

const iconMap = {
  clock:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>),
  spark:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>),
  stage:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" strokeLinejoin="round" /></svg>),
  trophy: (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M12 15a4 4 0 0 0 4-4V3H8v8a4 4 0 0 0 4 4zM8 21h8M12 15v6M5 7H3v4a3 3 0 0 0 3 3M19 7h2v4a3 3 0 0 1-3 3" strokeLinejoin="round" /></svg>)
};

export function Highlights() {
  return (
    <section id="highlights" className="relative z-10 py-24 lg:py-32">
      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Etkinlikte Seni Bekleyenler"
            title="İki gün, sınırsız kod,"
            gradient="gerçek çözümler."
            className="mb-16"
          />
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((h, i) => (
            <RevealOnScroll key={h.id} delay={i * 0.08}>
              <Card hover className="h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${h.accent}26`, border: `1px solid ${h.accent}4D` }}
                >
                  {iconMap[h.iconKey]?.(h.accent)}
                </div>
                <div className="font-display text-3xl font-bold mb-1">{h.title}</div>
                <div className="text-ink-dim text-sm">{h.desc}</div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
