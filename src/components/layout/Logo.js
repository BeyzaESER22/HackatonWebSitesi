import Link from 'next/link';

export function Logo({ size = 'md' }) {
  const dim = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const txt = size === 'lg' ? 'text-xl' : 'text-lg';
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <span className={`relative ${dim} grid grid-cols-2 grid-rows-2 gap-[3px] rotate-45 group-hover:rotate-[225deg] transition-transform duration-700`}>
        <span className="rounded-tl-md bg-google-blue" />
        <span className="rounded-tr-md bg-google-red" />
        <span className="rounded-bl-md bg-google-green" />
        <span className="rounded-br-md bg-google-yellow" />
      </span>
      <span className={`font-display font-bold tracking-tight ${txt}`}>
        HackFest<span className="hf-text-gradient">'26 AI</span>
      </span>
    </Link>
  );
}
