export const theme = {
  colors: {
    green: 'var(--green)',
    blue: 'var(--blue)',
    white: 'var(--white)',
    black: 'var(--black)',
    grey100: 'var(--grey-100)',
    grey200: 'var(--grey-200)',
    grey300: 'var(--grey-300)',
    grey500: 'var(--grey-500)',
    grey600: 'var(--grey-600)',
    red: 'var(--red)',
    purple: 'var(--purple)',
    yellow: 'var(--yellow)',
    orange: 'var(--orange)',
    navy: 'var(--navy)',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
  },
  fontWeights: {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400,
    thin: 300,
  },

  space: {
    none: '0',
    '2xs': '2px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
  componentSizes: {
    sm: {
      height: '32px',
      padding: '4px 8px',
      iconSize: '12px',
    },
    md: {
      height: '40px',
      padding: '8px 16px',
      iconSize: '16px',
    },
    lg: {
      height: '48px',
      padding: '12px 24px',
      iconSize: '20px',
    },
  },
  animations: {
    duration: {
      fast: '0.1s',
      normal: '0.2s',
      slow: '0.3s',
    },
    easing: {
      easeInOut: 'ease-in-out',
      easeOut: 'ease-out',
      easeIn: 'ease-in',
    },
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.15)',
    focus: '0 0 0 2px rgba(0, 184, 148, 0.3)',
  },
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50%',
  },
}

export type MyTheme = typeof theme
