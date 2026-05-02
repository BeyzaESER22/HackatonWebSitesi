import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getOrderedTeam } from '@/data/team';
import { buildMetadata } from '@/lib/seo';
import { GradientGlow } from '@/components/effects/GradientGlow';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';

export const metadata = buildMetadata({
  title: 'Ekip',
  description: 'HackFest\'26 AI organizasyon ekibi — GDG On Campus İstinye Üniversitesi.',
  path: '/team'
});

export default function TeamPage() {
  const members = getOrderedTeam();

  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-[#05071A]">
      {/* Visual background sync with Hero/Highlights */}
      <GradientGlow />
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden opacity-30 z-0">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>

      <Container className="relative z-10">
        <RevealOnScroll>
          <SectionTitle
            eyebrow="HackFest'26 Ekibi"
            title="Geleceği şekillendiren"
            gradient="beyinlerle tanışın."
            align="left"
            className="mb-8"
          />
          <p className="text-white/60 text-lg max-w-2xl mb-20 leading-relaxed font-medium">
            Google Developer Groups On Campus İstinye Üniversitesi çekirdek ekibi. Bu festivali sıfırdan ayağa kaldıran tutkulu toplulukla tanışın.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {members.map((member, idx) => (
            <RevealOnScroll key={member.id} delay={idx * 0.05}>
              <div className="group relative">
                {/* Member Card */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Photo Container with specialized border/glow */}
                  <div className="relative mb-6 w-full aspect-square max-w-[240px]">
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[2rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2">
                      <Avatar member={member} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center w-full">
                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
                      {member.role}
                    </div>
                    <h4 className="font-display text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h4>
                    {member.bio && (
                      <p className="text-xs text-white/40 leading-relaxed px-4 line-clamp-2 italic">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      <style>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background-size: 50% 100%;
          transform-origin: center bottom;
        }
        .wave1 {
          animation: wave-anim 25s linear infinite;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%2334D399"><path d="M0 200 C400 100 400 300 800 200 C1200 100 1200 300 1600 200 L1600 400 L0 400 Z" opacity="0.1"/></svg>');
        }
        .wave2 {
          animation: wave-anim 20s linear infinite reverse;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%234285F4"><path d="M0 200 C400 300 400 100 800 200 C1200 300 1200 100 1600 200 L1600 400 L0 400 Z" opacity="0.05"/></svg>');
        }
        @keyframes wave-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function Avatar({ member }) {
  if (member.photoUrl) {
    return (
      <img 
        src={member.photoUrl} 
        alt={member.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
    );
  }
  return (
    <div
      className="h-full w-full flex items-center justify-center font-display font-bold text-white/85 text-5xl relative"
      style={{ background: `linear-gradient(135deg, ${member.colorFrom}, ${member.colorTo})` }}
    >
      {member.initials}
      <span className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 50%)' }} />
    </div>
  );
}
