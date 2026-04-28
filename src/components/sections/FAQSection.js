import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { faq } from '@/data/faq';

export function FAQSection() {
  return (
    <section id="faq" className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container size="sm">
        <RevealOnScroll>
          <SectionTitle eyebrow="SSS" title="Sıkça Sorulan" gradient="Sorular." className="mb-16" />
        </RevealOnScroll>

        <RevealOnScroll>
          <Accordion items={faq} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
