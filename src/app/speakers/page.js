import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { SpeakerCard } from '@/components/sections/SpeakersSection';
import { speakers, speakerSessions } from '@/data/speakers';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Konuşmacılar',
  description: 'HackFest\'26 AI sahnesinde yer alacak konuşmacılar.',
  path: '/speakers'
});

export default function SpeakersPage() {
  return (
    <section className="pt-36 pb-24 lg:pt-44 lg:pb-32">
      <Container>
        <SectionTitle
          eyebrow="Konuşmacılar"
          title="Sahnede"
          gradient="geleceği şekillendirenler."
          align="left"
          className="mb-6"
        />
        <p className="text-ink-dim text-lg max-w-2xl mb-12">
          HackFest'26 AI kapsamında workshop ve veri bilimi panelinde katılımcılarla buluşacak konuşmacılar.
          Kartlara tıklayarak konuşmacıların yer aldığı oturum bilgilerini inceleyebilirsiniz.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {speakers.map(s => <SpeakerCard key={s.id} speaker={s} />)}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-3">Oturumlar</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Programdaki konuşmacı oturumları</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {speakerSessions.map(session => (
              <Card key={session.id} className="!p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-dim">{session.type}</span>
                  <span className="text-ink-dim">·</span>
                  <span className="font-mono text-sm text-white">{session.day} · {session.time}</span>
                </div>
                <div className="font-display text-xl font-semibold mb-2">{session.title}</div>
                <p className="text-sm text-ink-dim mb-4">{session.description}</p>
                <div className="space-y-2 text-sm text-white/80">
                  <div>Konum: {session.room}</div>
                  <div>Konuşmacılar: {session.speakers.join(', ')}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
