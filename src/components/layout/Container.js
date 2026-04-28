import { cn } from '@/lib/helpers';

export function Container({ children, className, size = 'default' }) {
  const sizes = {
    sm:      'max-w-3xl',
    default: 'max-w-7xl',
    lg:      'max-w-[88rem]'
  };
  return <div className={cn('mx-auto px-6 lg:px-10', sizes[size], className)}>{children}</div>;
}
