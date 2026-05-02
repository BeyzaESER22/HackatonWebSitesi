'use client';
import { useCountdown } from '@/hooks/useCountdown';
import { COLORS, SITE } from '@/lib/constants';
import { formatDateTR } from '@/lib/helpers';

export function Countdown({ targetISO = SITE.eventDateISO }) {
  const { days, hours, mins, secs } = useCountdown(targetISO);

  return (
    <div className="hf-glass p-6 lg:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-ink-dim mb-1">Etkinliğe Kalan Süre</div>
          <div className="font-display text-lg font-semibold">{formatDateTR(targetISO)}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 lg:gap-4">
        <Cell value={days}  color={COLORS.blue}   label="Gün" />
        <Cell value={hours} color={COLORS.red}    label="Saat" />
        <Cell value={mins}  color={COLORS.yellow} label="Dakika" />
        <Cell value={secs}  color={COLORS.green}  label="Saniye" />
      </div>

      <style>{`
        @keyframes cd-flip-in {
          0%   { transform: translateY(-40%) scaleY(0.6); opacity: 0; }
          60%  { transform: translateY(6%)   scaleY(1.05); opacity: 1; }
          100% { transform: translateY(0)    scaleY(1);    opacity: 1; }
        }
        .cd-digit {
          display: inline-block;
          animation: cd-flip-in 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

function Cell({ value, color, label }) {
  return (
    <div className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
      <div
        className="font-display text-4xl lg:text-5xl font-bold tabular-nums"
        style={{ color }}
      >
        <span key={value} className="cd-digit">{value}</span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-1">{label}</div>
    </div>
  );
}
