'use client';
import { useEffect, useState } from 'react';
import { pad } from '@/lib/helpers';

export function useCountdown(targetISO) {
  const target = typeof targetISO === 'string' ? new Date(targetISO).getTime() : targetISO;
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: '00', hours: '00', mins: '00', secs: '00', done: true };
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);
    return { days: pad(days), hours: pad(hours), mins: pad(mins), secs: pad(secs), done: false };
  };

  const [time, setTime] = useState({ days: '--', hours: '--', mins: '--', secs: '--', done: false });

  useEffect(() => {
    setTime(calc());
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}
