export const theme = {
  colors: {
    green: 'var(--green)',
    blue: 'var(--blue)',
    white: 'var(--white)',
    black: 'var(--black)',
    grey100: 'var(--grey-100)',
    grey500: 'var(--grey-500)',
    border: 'var(--grey-border)',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
  },
  fontWeights: {
    bold: 700,
    normal: 400,
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
}

export type Theme = typeof theme
