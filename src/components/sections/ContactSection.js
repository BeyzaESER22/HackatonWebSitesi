import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { SITE, COLORS } from '@/lib/constants';

export function ContactSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="İletişim"
            title="Sorun mu var?"
            gradient="Bize ulaş."
            className="mb-12"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <RevealOnScroll>
            <ContactCard
              accent={COLORS.blue}
              icon={(<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l9 6 9-6M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" strokeLinejoin="round" /></svg>)}
              title="E-posta"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <ContactCard
              accent={COLORS.red}
              icon={(<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>)}
              title="Instagram"
              value="@gdgoncampusistinye"
              href={SITE.social.instagram}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <ContactCard
              accent={COLORS.green}
              icon={(<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.65a11.92 11.92 0 0 0 5.77 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.42-8.43zM12.05 21.78h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.46 4.45-9.91 9.9-9.91a9.83 9.83 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.87-9.92 9.87zm5.43-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.49a9.06 9.06 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z"/></svg>)}
              title="WhatsApp"
              value="Topluluk Kanalı"
              href={SITE.social.whatsapp}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <ContactCard
              accent={COLORS.yellow}
              icon={(<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>)}
              title="X (Twitter)"
              value="@gdgoncampusisu"
              href={SITE.social.twitter}
            />
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <ContactCard
              accent={COLORS.cyan}
              icon={(<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>)}
              title="LinkedIn"
              value="GDG On Campus ISU"
              href={SITE.social.linkedin}
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function ContactCard({ accent, icon, title, value, href }) {
  const content = (
    <Card hover className="h-full">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}26`, color: accent }}>
        {icon}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-1">{title}</div>
      <div className="text-sm font-medium break-words">{value}</div>
    </Card>
  );
  return href ? <a href={href}>{content}</a> : content;
}
