module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0f0a',
        surface: '#0f1f0f',
        deep: '#060d06',
        accent: '#4ade80',
        muted: '#4a7a4a',
        dim: '#2d5a2d',
        border: '#1a3a1a',
        warn: '#fb923c',
        danger: '#f87171'
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};
