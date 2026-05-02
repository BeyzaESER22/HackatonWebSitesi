import { SITE } from '@/lib/constants';
import { cn } from '@/lib/helpers';

const infoRows = [
  {
    label: 'E-Posta',
    content: (
      <a href={`mailto:${SITE.email}`} className="transition hover:text-[#2F57D8]">
        {SITE.email}
      </a>
    )
  },
  {
    label: 'Topluluk',
    content: (
      <a
        href="https://gdg.community.dev/gdg-on-campus-istinye-university-istanbul-turkiye/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 transition hover:text-[#2F57D8]"
      >
        gdg.community.dev <span className="text-xs">↗</span>
      </a>
    )
  },
  {
    label: 'Tarih',
    content: SITE.eventDates
  }
];

export function HackathonApplicationShell({
  children,
  className,
  leftPanelClassName,
  rightPanelClassName
}) {
  return (
    <div
      className={cn(
        'grid overflow-hidden rounded-[2rem] border border-white/10 shadow-soft lg:grid-cols-[0.8fr_1.2fr]',
        className
      )}
    >
      <aside
        className={cn(
          'relative isolate overflow-hidden bg-[#F5EEDF] px-7 py-8 text-[#161B46] sm:px-8 lg:px-12 lg:py-12',
          leftPanelClassName
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(22,27,70,0.06),transparent_46%)]" />
        <div className="relative">
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-[#7A7365]">
            /HACKATHON BAŞVURUSU
          </div>

          <h2 className="font-display text-[2.7rem] font-black leading-[0.95] tracking-[-0.03em] text-[#141B4C] sm:text-6xl">
            Aramıza <span className="font-light italic text-primary">katıl.</span>
          </h2>

          <div className="mt-12 space-y-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
                Fiziksel Katılım
              </div>
              <p className="text-[#5C594E] leading-relaxed text-sm">
                Bu etkinlik online DEĞİLDİR. Katılım <strong>İstinye Üniversitesi Vadi (Sarıyer)</strong> kampüsünde fiziksel olarak sağlanacaktır.
                <br />
                <span className="text-xs mt-1 block font-bold">⚠️ Katılımcıların kendi bilgisayarlarını getirmesi zorunludur.</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-navy-950 font-bold text-sm uppercase tracking-wider">
                Proje Teması
              </div>
              <p className="text-[#5C594E] leading-relaxed text-sm">
                <strong className="italic">"Toplum Yararına Yapay Zeka"</strong>
                <br />
                <span className="text-xs mt-1 block leading-normal">
                  Projeniz; eğitim, sağlık, çevre veya erişilebilirlik gibi bir <strong>alt kategoriye</strong> odaklanmalıdır. Detaylı bilgi için <a href="/hackathon" className="text-primary underline">hackathon sayfasını</a> inceleyiniz.
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-navy-950 font-bold text-sm uppercase tracking-wider">
                Ödüller
              </div>
              <p className="text-primary font-bold animate-pulse">
                Yakında açıklanacak 🎁
              </p>
            </div>

            <dl className="pt-8 border-t border-[#D9D0BE]">
              {infoRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[100px_1fr] gap-4 py-4 border-b border-[#D9D0BE]/50">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-[#7A7365] pt-1">{row.label}</dt>
                  <dd className="font-bold text-[#141B4C]">{row.content}</dd>
                </div>
              ))}
            </dl>

            <div className="pt-6">
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-600/20 transition-transform hover:scale-[1.02] active:scale-95"
              >
                WhatsApp Grubuna Katıl
              </a>
            </div>
          </div>
        </div>
      </aside>

      <section
        className={cn(
          'relative isolate overflow-hidden bg-[linear-gradient(180deg,#101736_0%,#0A102A_100%)] px-7 py-8 sm:px-8 lg:px-12 lg:py-12',
          rightPanelClassName
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,121,255,0.1),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(182,107,255,0.1),transparent_35%)]" />
        <div className="relative">
          <div className="mb-2 text-xs uppercase tracking-[0.22em] text-ink-dim">
            Başvuru Formu
          </div>
          <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Seni de bekliyoruz.
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
            Geleceği birlikte kodlamak için formu eksiksiz doldur.
          </p>

          <div className="mt-12">{children}</div>
        </div>
      </section>
    </div>
  );
}
