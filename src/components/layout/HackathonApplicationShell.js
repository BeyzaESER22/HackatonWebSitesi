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
    label: 'Üniversite',
    content: (
      <a
        href="https://www.istinye.edu.tr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 transition hover:text-[#2F57D8]"
      >
        istinye.edu.tr <span className="text-xs">↗</span>
      </a>
    )
  },
  {
    label: 'Adres',
    content: (
      <>
        Ayazaga Mah. Azerbaycan Cad. No:3H,
        <br />
        Sariyer 34396, Istanbul
      </>
    )
  },
  {
    label: 'Telefon',
    content: SITE.phone
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
        'grid overflow-hidden rounded-[2rem] border border-white/10 shadow-soft lg:grid-cols-[0.96fr_1.08fr]',
        className
      )}
    >
      <aside
        className={cn(
          'relative isolate overflow-hidden bg-[#F5EEDF] px-7 py-8 text-[#161B46] sm:px-8 lg:px-10 lg:py-10',
          leftPanelClassName
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(22,27,70,0.06),transparent_46%)]" />
        <div className="relative">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-[#7A7365]">
            /HACKATHON BAŞVURUSU
          </div>

          <h2 className="font-display text-[2.7rem] font-bold leading-[0.95] tracking-[-0.03em] text-[#141B4C] sm:text-6xl">
            Aramıza <span className="font-light italic">katıl.</span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#5C594E] sm:text-lg">
            HackFest&apos;26 hackathon&apos;una başvurmak için formu doldur. Başvurular
            jüri tarafından değerlendirilecek, sonuç sana e-posta ile iletilecek.
          </p>

          <dl className="mt-10 border-t border-[#D9D0BE]">
            {infoRows.map((row) => (
              <InfoRow key={row.label} label={row.label}>
                {row.content}
              </InfoRow>
            ))}
          </dl>
        </div>
      </aside>

      <section
        className={cn(
          'relative isolate overflow-hidden bg-[linear-gradient(180deg,#101736_0%,#0A102A_100%)] px-7 py-8 sm:px-8 lg:px-9 lg:py-9',
          rightPanelClassName
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,121,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(182,107,255,0.18),transparent_35%)]" />
        <div className="relative">
          <div className="mb-2 text-xs uppercase tracking-[0.22em] text-ink-dim">
            Hackathon Başvurusu
          </div>
          <h3 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Geleceği kodlamaya hazır mısın?
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base">
            Formu doldur, başvurun jüri tarafından değerlendirilsin.
          </p>

          <div className="mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="grid grid-cols-[104px_1fr] gap-4 border-b border-[#D9D0BE] py-5 text-[#171F4E] sm:grid-cols-[132px_1fr]">
      <dt className="pt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A7365]">
        {label}
      </dt>
      <dd className="text-lg font-semibold leading-relaxed">{children}</dd>
    </div>
  );
}
