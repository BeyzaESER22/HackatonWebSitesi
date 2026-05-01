'use client';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { COLORS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

export function CTASection() {
  const { openModal } = useApp();

  return (
    <section className="relative z-10 py-24 lg:py-32">
      <Container>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[40px] p-10 md:p-16 lg:p-20 text-center"
            style={{
              background:
                'radial-gradient(800px 400px at 20% 10%, rgba(66,133,244,.4), transparent 60%),' +
                'radial-gradient(800px 400px at 80% 90%, rgba(234,67,53,.4), transparent 60%),' +
                'linear-gradient(135deg, #0E1740, #050A1F)',
              border: '1px solid rgba(255,255,255,.08)'
            }}
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px),' +
                  'linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
              }}
            />

            <div className="relative">
              <Badge dotColor={COLORS.green} className="mb-6">Başvurular Açık</Badge>

              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[1] g-word">
                <span className="b">G</span><span className="r">e</span><span className="y">l</span><span className="g">e</span>
                <span className="b">c</span><span className="r">e</span><span className="y">ğ</span><span className="g">i</span>
                <span className="block hf-text-gradient">Kodlayanlar Arasına Katıl.</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />}>Hackathon'a Katıl</Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
