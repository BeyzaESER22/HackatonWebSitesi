import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { SpeakerCard } from '@/components/sections/SpeakersSection';
import { speakers } from '@/data/speakers';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Konuşmacılar',
  description: 'HackFest\'26 AI sahnesinde yer alacak konuşmacılar.',
  path: '/speakers'
});

export default function SpeakersPage() {
  const real = speakers.filter(s => !s.isSample);
  const sample = speakers.find(s => s.isSample);

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
          Konuşmacılar yakında açıklanacaktır. Aşağıdaki tutucu profillerin yerini gerçek konuşmacılar alacaktır.
          Her bir karta tıklayarak konuşmacı detay sayfasının nasıl görüneceğini inceleyebilirsiniz.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {real.map(s => <SpeakerCard key={s.id} speaker={s} />)}
        </div>

        {sample && (
          <Card className="!p-8 lg:!p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-2">★ Örnek Profil</div>
                <div className="font-display text-2xl font-bold mb-1">Konuşmacı detay sayfası nasıl görünecek?</div>
                <p className="text-sm text-ink-dim max-w-xl">
                  Gerçek konuşmacıların oturum saatleri, salon bilgisi, hedef kitle ve detaylı açıklamalarıyla
                  aşağıdaki örnek profili inceleyebilirsiniz.
                </p>
              </div>
              <Link
                href={`/speakers/${sample.id}`}
                className="hf-glass hf-glass-hover px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap"
              >
                Örnek profili gör →
              </Link>
            </div>
          </Card>
        )}
      </Container>
    </section>
  );
}
