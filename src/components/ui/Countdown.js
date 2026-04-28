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
    </div>
  );
}

function Cell({ value, color, label }) {
  return (
    <div className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
      <div className="font-display text-4xl lg:text-5xl font-bold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-ink-dim mt-1">{label}</div>
    </div>
  );
}
