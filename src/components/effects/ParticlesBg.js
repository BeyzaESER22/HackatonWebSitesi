'use client';

/**
 * ParticlesBg — subtle, static network lines as decoration.
 *
 * Note: floating code chips were removed because they created
 * distracting motion. Network lines stay static.
 */
export function ParticlesBg() {
  return (
    <svg
      className="hf-net-lines"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nl1" x1="0" x2="1">
          <stop offset="0%"   stopColor="#4285F4" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
      </defs>
      <g stroke="url(#nl1)" strokeWidth="1" fill="none">
        <path d="M50 120 L300 200 L600 80 L900 220 L1180 90" />
        <path d="M80 700 L350 580 L640 720 L920 560 L1170 690" />
        <path d="M200 400 L500 350 L800 460 L1100 380" />
      </g>
      <g fill="white">
        <circle cx="300" cy="200" r="2.5" />
        <circle cx="600" cy="80"  r="2.5" />
        <circle cx="900" cy="220" r="2.5" />
        <circle cx="350" cy="580" r="2.5" />
        <circle cx="640" cy="720" r="2.5" />
        <circle cx="800" cy="460" r="2.5" />
      </g>
    </svg>
  );
}
