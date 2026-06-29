/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        htf: ['HackTheFlag', 'Share Tech Mono', 'monospace'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      colors: {
        red: {
          DEFAULT: '#dc3545',
          dim: '#79282c',
          faint: 'rgba(220,53,69,0.08)',
        },
        surface: '#0d0d0d',
        border: '#1a1a1a',
        muted: '#555555',
      },
    },
  },
  plugins: [],
};
