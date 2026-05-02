'use client';
import { Container } from '@/components/layout/Container';
import { SITE } from '@/lib/constants';

/**
 * ContactFormLayout
 *
 * Sol tarafta görseldeki "Aramıza katıl" tarzı iletişim kartı,
 * sağ tarafta form alanı. /register ve /speaker-event sayfalarında
 * birlikte kullanılır.
 *
 * Props:
 *   eyebrow:    sol üst label (örn. "/BAŞVURU FORMU")
 *   title:      ana başlık ilk kısmı (örn. "Aramıza")
 *   titleAccent: italic vurgu (örn. "katıl.")
 *   description: title altındaki paragraf
 *   children:    sağ taraftaki form içeriği (HackathonForm, EventRegisterForm, vb.)
 */
export function ContactFormLayout({
  eyebrow = '/İLETİŞİM BİLGİLERİ',
  title = 'Aramıza',
  titleAccent = 'katıl.',
  description,
  children
}) {
  return (
    <section className="pt-32 lg:pt-36 pb-24 lg:pb-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: Info panel */}
          <div className="hf-info-panel rounded-3xl p-8 lg:p-10">
            <div className="font-mono text-xs tracking-[0.22em] text-ink-mute uppercase mb-8">
              {eyebrow}
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              {title} <span className="italic font-light">{titleAccent}</span>
            </h1>

            {description && (
              <p className="text-ink-dim text-base lg:text-lg leading-relaxed mb-10 max-w-md">
                {description}
              </p>
            )}

            <dl className="space-y-0">
              <InfoRow label="E-Posta">
                <a href={`mailto:${SITE.email}`} className="hover:text-google-blue transition">
                  {SITE.email}
                </a>
              </InfoRow>

              <InfoRow label="Topluluk">
                <a
                  href="https://gdg.community.dev/gdg-on-campus-istinye-university-istanbul-turkiye/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-google-blue transition inline-flex items-center gap-1.5"
                >
                  gdg.community.dev <span className="text-xs">↗</span>
                </a>
              </InfoRow>

              <InfoRow label="Üniversite">
                <a
                  href="https://www.istinye.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-google-blue transition inline-flex items-center gap-1.5"
                >
                  istinye.edu.tr <span className="text-xs">↗</span>
                </a>
              </InfoRow>

              <InfoRow label="Adres">
                Ayazağa Mah. Azerbaycan Cad. No:4J,<br />Vadi İstanbul, Sarıyer, İstanbul
              </InfoRow>

              <InfoRow label="Tarih">
                {SITE.eventDates}
              </InfoRow>
            </dl>
          </div>

          {/* RIGHT: Form */}
          <div className="hf-form-panel rounded-3xl p-7 lg:p-9 lg:sticky lg:top-28">
            {children}
          </div>
        </div>
      </Container>

      <style>{`
        .hf-info-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .hf-form-panel {
          background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));
          border: 1px solid rgba(255, 255, 255, 0.10);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
      `}</style>
    </section>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="grid grid-cols-[110px_1fr] lg:grid-cols-[140px_1fr] gap-4 py-5 border-t border-white/8 first:border-t-0 items-start">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute pt-0.5">
        {label}
      </dt>
      <dd className="font-medium text-ink leading-relaxed">{children}</dd>
    </div>
  );
}
