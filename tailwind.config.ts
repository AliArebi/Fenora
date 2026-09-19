import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
      },
      borderRadius: { xl: '0.875rem', lg: '0.7rem', md: '0.55rem' },
      boxShadow: { panel: '0 16px 45px rgba(0,0,0,.18)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
