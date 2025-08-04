import React from 'react'
import { css } from '@emotion/react'
import type { Theme } from '~/styles/theme'
import { Loader } from '../loader'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      css={(theme: Theme) => [
        baseButtonStyles(theme),
        variantStyles[variant](theme),
        sizeStyles[size](theme),
        loading && loadingStyles,
      ]}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && <Loader size={size} />}
      {children}
    </button>
  )
}

const baseButtonStyles = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.fontWeights.normal};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
  cursor: pointer;
  border: 1px solid;
  line-height: 1.5;

  &:focus {
    outline: none;
    box-shadow: ${theme.shadows.focus};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:hover:not(:disabled) {
    box-shadow: ${theme.shadows.lg};
  }
`

const variantStyles = {
  primary: (theme: Theme) => css`
    background-color: ${theme.colors.green};
    color: ${theme.colors.white};
    border-color: ${theme.colors.green};
    box-shadow: 0 2px 8px rgba(0, 184, 148, 0.24);

    &:hover:not(:disabled) {
      background-color: #00a082;
      border-color: #00a082;
      box-shadow: 0 4px 16px rgba(0, 184, 148, 0.32);
    }
  `,
  secondary: (theme: Theme) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    border-color: ${theme.colors.border};
    box-shadow: ${theme.shadows.sm};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.grey100};
      border-color: ${theme.colors.green};
      box-shadow: ${theme.shadows.md};
    }
  `,
  accent: (theme: Theme) => css`
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    border-color: ${theme.colors.blue};
    box-shadow: 0 2px 8px rgba(93, 173, 226, 0.24);

    &:hover:not(:disabled) {
      background-color: #4a9fd9;
      border-color: #4a9fd9;
      box-shadow: 0 4px 16px rgba(93, 173, 226, 0.32);
    }
  `,
}

const sizeStyles = {
  sm: (theme: Theme) => css`
    padding: ${theme.componentSizes.sm.padding};
    font-size: ${theme.fontSizes.sm};
    min-height: ${theme.componentSizes.sm.height};
  `,
  md: (theme: Theme) => css`
    padding: ${theme.componentSizes.md.padding};
    font-size: ${theme.fontSizes.md};
    min-height: ${theme.componentSizes.md.height};
  `,
  lg: (theme: Theme) => css`
    padding: ${theme.componentSizes.lg.padding};
    font-size: ${theme.fontSizes.lg};
    min-height: ${theme.componentSizes.lg.height};
  `,
}

const loadingStyles = css`
  pointer-events: none;
`
