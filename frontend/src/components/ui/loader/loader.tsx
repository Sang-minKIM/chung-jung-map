import { css, keyframes } from '@emotion/react'
import type { Theme } from '~/styles/theme'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <svg
      css={(theme: Theme) => [spinnerStyles, sizeStyles[size](theme)]}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        opacity="0.75"
      />
    </svg>
  )
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const spinnerStyles = css`
  animation: ${spin} 1s linear infinite;
`

const sizeStyles = {
  sm: (theme: Theme) => css`
    width: ${theme.componentSizes.sm.iconSize};
    height: ${theme.componentSizes.sm.iconSize};
    margin-right: ${theme.space.xs};
    margin-left: -2px;
  `,
  md: (theme: Theme) => css`
    width: ${theme.componentSizes.md.iconSize};
    height: ${theme.componentSizes.md.iconSize};
    margin-right: ${theme.space.sm};
    margin-left: -4px;
  `,
  lg: (theme: Theme) => css`
    width: ${theme.componentSizes.lg.iconSize};
    height: ${theme.componentSizes.lg.iconSize};
    margin-right: ${theme.space.md};
    margin-left: -6px;
  `,
}
