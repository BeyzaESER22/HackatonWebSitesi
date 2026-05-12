import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { speakers } from '@/data/speakers';

export function SpeakersSection({ limit = 7 }) {
  const list = speakers.slice(0, limit);

  return (
    <section id="speakers" className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-3">Konuşmacılar</div>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                Sahnede <span className="hf-text-gradient">geleceği şekillendirenler.</span>
              </h2>
            </div>
            <p className="text-ink-dim max-w-md">
              Workshop ve panel oturumlarında HackFest'26 AI katılımcılarıyla buluşacak isimler.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((s, i) => (
            <RevealOnScroll key={s.id} delay={(i % 4) * 0.08}>
              <SpeakerCard speaker={s} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.32}>
          <div className="mt-10 flex justify-center">
            <Button as={Link} href="/speakers" variant="ghost" size="sm">Tüm Konuşmacılar ve Oturumlar</Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export function SpeakerCard({ speaker }) {
  return (
    <Link href={`/speakers/${speaker.id}`} className="block h-full">
      <Card hover className="!p-0 overflow-hidden h-full flex flex-col">
        <SpeakerAvatar speaker={speaker} />
        <div className="p-5">
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink-dim mb-2">{speaker.type} · {speaker.day}</div>
          <div className="font-display text-lg font-semibold">{speaker.name}</div>
          <div className="text-sm text-ink-dim mb-3">
            {speaker.title}{speaker.company ? ` · ${speaker.company}` : ''}
          </div>
          <div className="text-xs text-white/70 line-clamp-2">{speaker.talk}</div>
        </div>
      </Card>
    </Link>
  );
}

export function SpeakerAvatar({ speaker }) {
  if (speaker.photoUrl) {
    return (
      <div className="aspect-square w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={speaker.photoUrl} alt={speaker.name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="aspect-square w-full flex items-center justify-center font-display font-bold text-white/85 text-5xl relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${speaker.colorFrom}, ${speaker.colorTo})` }}
    >
      {speaker.initials}
      <span className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 50%)' }} />
    </div>
  );
}
