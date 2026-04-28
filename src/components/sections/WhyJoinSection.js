import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { whyJoin } from '@/data/highlights';

export function WhyJoinSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Neden Katılmalısın?"
            title="Sadece bir etkinlik değil —"
            gradient="bir kariyer dönüm noktası."
            className="mb-16"
          />
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyJoin.map((w, i) => (
            <RevealOnScroll key={w.num} delay={(i % 3) * 0.07}>
              <Card hover className="h-full">
                <div className="font-display text-4xl font-bold mb-4" style={{ color: w.accent }}>{w.num}</div>
                <div className="font-display text-xl font-semibold mb-2">{w.title}</div>
                <div className="text-ink-dim text-sm">{w.desc}</div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
