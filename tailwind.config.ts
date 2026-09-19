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
      boxShadow: { panel: '0 16px 40px rgba(24, 86, 67, .09), 0 2px 8px rgba(24, 86, 67, .04)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
