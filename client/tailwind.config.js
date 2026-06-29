export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted-foreground)',
        card: 'var(--card)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        'primary-foreground': 'var(--primary-foreground)',
      },
    },
  },
  plugins: [],
};
