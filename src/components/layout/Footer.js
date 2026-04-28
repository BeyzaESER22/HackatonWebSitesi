import Link from 'next/link';
import { Logo } from './Logo';
import { SITE } from '@/lib/constants';

const socialIcons = [
  {
    name: 'Instagram',
    href: SITE.social.instagram,
    fill: false,
    svg: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    )
  },
  {
    name: 'Twitter',
    href: SITE.social.twitter,
    fill: true,
    svg: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    )
  },
  {
    name: 'WhatsApp',
    href: SITE.social.whatsapp,
    fill: true,
    svg: (
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.65a11.92 11.92 0 0 0 5.77 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.42-8.43zM12.05 21.78h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.84 9.84 0 0 1-1.51-5.27c0-5.46 4.45-9.91 9.9-9.91a9.83 9.83 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.87-9.92 9.87zm5.43-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.49a9.06 9.06 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z" />
    )
  }
];

export function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <div className="mb-5"><Logo /></div>
            <p className="text-ink-dim text-sm max-w-md leading-relaxed mb-6">
              {SITE.organizer} tarafından düzenlenen, toplum yararına yapay zeka odaklı bir hackathon ve konuşmacı etkinliği.
            </p>
            <div className="flex gap-3">
              {socialIcons.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition"
                >
                  <svg
                    width="16"
                    height="16"
                    fill={s.fill ? 'currentColor' : 'none'}
                    stroke={s.fill ? 'none' : 'currentColor'}
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    {s.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Etkinlik">
            <FooterLink href="/hackathon">Hackathon</FooterLink>
            <FooterLink href="/speakers">Konuşmacılar</FooterLink>
            <FooterLink href="/schedule">Program</FooterLink>
            <FooterLink href="/projects">Projeler</FooterLink>
            <FooterLink href="/team">Ekip</FooterLink>
          </FooterCol>

          <FooterCol title="Topluluk">
            <FooterLink href="/sponsors">Sponsorlar</FooterLink>
            <FooterLink href="/#faq">SSS</FooterLink>
            <FooterLink href="/register">Hackathon Başvurusu</FooterLink>
            <FooterLink href="/projects/submit">Proje Gönder</FooterLink>
          </FooterCol>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-4">İletişim</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <svg width="16" height="16" className="mt-0.5 shrink-0" fill="none" stroke="#4285F4" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l9 6 9-6M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" strokeLinejoin="round" />
                </svg>
                <a href={`mailto:${SITE.email}`} className="hover:text-white text-ink-dim transition break-all">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" className="mt-0.5 shrink-0" fill="none" stroke="#EA4335" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span className="text-ink-dim">{SITE.location.full}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg width="16" height="16" className="mt-0.5 shrink-0" fill="none" stroke="#FBBC05" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" />
                </svg>
                <span className="text-ink-dim">{SITE.eventDates}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink-dim">
          <div>© 2026 GDG On Campus İstinye Üniversitesi. Tüm hakları saklıdır.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition">Gizlilik</Link>
            <Link href="#" className="hover:text-white transition">KVKK</Link>
            <Link href="#" className="hover:text-white transition">Kullanım Koşulları</Link>
          </div>
        </div>

        <div className="text-center text-[10px] text-ink-dim mt-6 font-mono">
          Made with <span className="text-google-red">♥</span> in İstanbul · Powered by coffee &amp; curiosity.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="lg:col-span-2">
      <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-4">{title}</div>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="hover:text-white text-ink-dim transition">{children}</Link>
    </li>
  );
}
