import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F2E8D6',
        ivory: '#F2E8D6',
        sand: '#C4A06E',
        leather: '#896038',
        garnet: '#871A3B',
        azaliIndigo: '#2C1268',
        umber: '#271509',
        espresso: '#271509',
        bark: '#896038',
        saddle: '#871A3B',
        olive: '#2C1268',
        brass: '#C4A06E'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        body: ['var(--font-body)', 'Montserrat', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif']
      },
      boxShadow: {
        soft: '0 14px 34px rgba(39, 21, 9, 0.08)',
        subtle: '0 10px 26px rgba(39, 21, 9, 0.06)'

      }
    }
  },
  plugins: []
};

export default config;
