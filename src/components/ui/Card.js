'use client';
import { cn } from '@/lib/helpers';

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'hf-glass p-6',
        hover && 'hf-glass-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
