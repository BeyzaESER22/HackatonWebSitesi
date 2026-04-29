import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SpeakerAvatar } from '@/components/sections/SpeakersSection';
import * as speakersModule from '@/data/speakers';
import { COLORS } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';

const speakers = speakersModule.speakers || [];
// Defensive lookup — works even if helper export is missing
const findSpeaker = speakersModule.getSpeakerById || ((id) => speakers.find(s => s.id === id) || null);

export const dynamicParams = true;

export function generateStaticParams() {
  return speakers.map(s => ({ id: s.id }));
}

export async function generateMetadata({ params }) {
  const speaker = findSpeaker(params.id);
  if (!speaker) return buildMetadata({ title: 'Konuşmacı bulunamadı' });
  return buildMetadata({
    title: speaker.name,
    description: speaker.bio,
    path: `/speakers/${params.id}`
  });
}

export default function SpeakerDetailPage({ params }) {
  const speaker = findSpeaker(params.id);
  if (!speaker) notFound();

  return (
    <article className="pt-36 pb-24 lg:pt-40 lg:pb-32">
      <Container>
        <Link href="/speakers" className="inline-flex items-center gap-2 text-sm text-ink-dim hover:text-white mb-8 transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tüm Konuşmacılar
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          {/* Avatar */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <SpeakerAvatar speaker={speaker} />
            </div>
          </div>

          {/* Header info */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {speaker.isSample && <Badge dotColor={COLORS.yellow}>★ Örnek Profil</Badge>}
              <Badge>{speaker.type} · {speaker.day}</Badge>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-3">
              {speaker.name}
            </h1>
            <div className="text-ink-dim text-lg mb-6">
              {speaker.title}{speaker.company ? ` · ${speaker.company}` : ''}
            </div>

            <p className="text-ink-dim leading-relaxed">{speaker.bio}</p>

            {(speaker.links?.twitter || speaker.links?.linkedin) && (
              <div className="flex items-center gap-3 mt-6">
                {speaker.links.twitter && (
                  <a href={speaker.links.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition" aria-label="Twitter">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {speaker.links.linkedin && (
                  <a href={speaker.links.linkedin} target="_blank" rel="noopener noreferrer"
                     className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition" aria-label="LinkedIn">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.78 0h4.37v1.91h.06c.61-1.14 2.1-2.34 4.32-2.34 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.51c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.43V22H8V8z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sessions */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Oturumlar</h2>

          {speaker.sessions?.length > 0 ? (
            <div className="space-y-4">
              {speaker.sessions.map(s => (
                <Card key={s.id} className="!p-6">
                  <div className="grid lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-3">
                      <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-1">{s.type}</div>
                      <div className="font-mono text-sm text-white">{s.day} · {s.time}</div>
                    </div>
                    <div className="lg:col-span-9">
                      <div className="font-display text-xl font-semibold mb-2">{s.title}</div>
                      <p className="text-sm text-ink-dim mb-4">{s.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                          📍 {s.room}
                        </span>
                        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                          👥 {s.audience}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-ink-dim">Bu konuşmacının oturum bilgileri yakında açıklanacaktır.</div>
            </Card>
          )}
        </div>
      </Container>
    </article>
  );
}
