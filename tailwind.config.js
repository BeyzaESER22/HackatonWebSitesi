/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/styles/**/*.{css}'
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue:   '#4285F4',
          red:    '#EA4335',
          yellow: '#FBBC05',
          green:  '#34A853'
        },
        navy: {
          900: '#050A1F',
          800: '#0A1235',
          700: '#0B1B4D',
          600: '#0E1740'
        },
        ink: {
          DEFAULT: '#E8ECF8',
          dim:     '#9CA8C9',
          mute:    '#5C6B92'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        sans:    ['var(--font-body)',    'Inter',         'sans-serif'],
        mono:    ['var(--font-mono)',    'JetBrains Mono','monospace']
      },
      backgroundImage: {
        'g-multi': 'linear-gradient(120deg, #4285F4 0%, #8AB4F8 35%, #EA4335 70%, #FBBC05 100%)',
        'g-cta':   'linear-gradient(120deg, #4285F4, #8B5CF6 40%, #EA4335 75%, #FBBC05)',
        'mesh':    'radial-gradient(1100px 800px at 12% 8%, rgba(66,133,244,.20), transparent 60%), radial-gradient(900px 700px at 88% 22%, rgba(234,67,53,.16), transparent 60%), radial-gradient(900px 700px at 78% 88%, rgba(52,168,83,.14), transparent 60%), radial-gradient(900px 700px at 18% 92%, rgba(251,188,5,.12), transparent 60%)'
      },
      boxShadow: {
        glow:       '0 8px 30px -8px rgba(66,133,244,.55), 0 0 0 1px rgba(255,255,255,.06) inset',
        'glow-red': '0 14px 40px -8px rgba(234,67,53,.55)',
        soft:       '0 30px 80px -20px rgba(0,0,0,.7)'
      },
      animation: {
        float:    'float 14s ease-in-out infinite',
        drift:    'drift 12s ease-in-out infinite',
        marquee:  'marquee 40s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(30px,-20px) scale(1.08)' }
        },
        drift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-100%)' }
        },
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' }
        }
      }
    }
  },
  plugins: []
};
