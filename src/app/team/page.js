import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { getOrderedTeam } from '@/data/team';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Ekip',
  description: 'HackFest\'26 AI organizasyon ekibi — GDG On Campus İstinye Üniversitesi.',
  path: '/team'
});

export default function TeamPage() {
  const members = getOrderedTeam();

  return (
    <section className="pt-36 pb-24 lg:pt-44 lg:pb-32">
      <Container>
        <SectionTitle
          eyebrow="Ekip"
          title="Bu etkinliği"
          gradient="biz organize ediyoruz."
          align="left"
          className="mb-6"
        />
        <p className="text-ink-dim text-lg max-w-2xl mb-12">
          Google Developer Groups On Campus İstinye Üniversitesi çekirdek ekibi. HackFest'26 AI'ı sıfırdan ayağa kaldıran ve etkinlik süresince sahada olacak ekibimizle tanışın.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map(member => (
            <Card key={member.id} hover className="!p-0 overflow-hidden h-full flex flex-col">
              <Avatar member={member} />
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ink-dim mb-2">{member.role}</div>
                <div className="font-display text-lg font-semibold mb-1">{member.name}</div>
                {member.bio && <div className="text-sm text-ink-dim line-clamp-3">{member.bio}</div>}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Avatar({ member }) {
  if (member.photoUrl) {
    return (
      <div className="aspect-square w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="aspect-square w-full flex items-center justify-center font-display font-bold text-white/85 text-5xl relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})` }}
    >
      {member.initials}
      <span className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 50%)' }} />
    </div>
  );
}
