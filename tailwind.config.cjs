module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
          light: '#f5f5f5',
          dark: '#0a0f0a'
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          light: '#ffffff',
          dark: '#0f1f0f'
        },
        deep: {
          DEFAULT: 'var(--color-deep)',
          light: '#e5e5e5',
          dark: '#060d06'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: '#16a34a',
          dark: '#4ade80'
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          light: '#6b7280',
          dark: '#4a7a4a'
        },
        dim: {
          DEFAULT: 'var(--color-dim)',
          light: '#d1d5db',
          dark: '#2d5a2d'
        },
        border: {
          DEFAULT: 'var(--color-border)',
          light: '#e5e7eb',
          dark: '#1a3a1a'
        },
        warn: {
          DEFAULT: 'var(--color-warn)',
          light: '#f59e0b',
          dark: '#fb923c'
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          light: '#ef4444',
          dark: '#f87171'
        },
        text: {
          DEFAULT: 'var(--color-text)',
          light: '#1a1a1a',
          dark: '#adebad'
        },
        'text-secondary': {
          DEFAULT: 'var(--color-text-secondary)',
          light: '#4b5563',
          dark: '#7ba97b'
        }
      },
      backgroundColor: {
        'heatmap-medium': 'var(--color-dim)',
        'heatmap-low': 'var(--color-muted)'
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
