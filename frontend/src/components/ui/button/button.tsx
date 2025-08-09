import React from 'react'
import { css, type Theme } from '@emotion/react'
import { Loader } from '../loader'

type ButtonColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  color?: ButtonColor
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  color = 'green',
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
        variantStyles[variant](theme, color),
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
  primary: (theme: Theme, color: ButtonColor) => css`
    background-color: ${theme.colors[color]};
    color: ${theme.colors.white};
    border-color: ${theme.colors[color]};
    box-shadow: ${theme.shadows.sm};

    &:hover:not(:disabled) {
      background-color: ${theme.colors[color]};
      border-color: ${theme.colors[color]};
      opacity: 0.9;
      box-shadow: ${theme.shadows.md};
    }
  `,
  outline: (theme: Theme, color: ButtonColor) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    border-color: ${theme.colors[color]};
    box-shadow: ${theme.shadows.sm};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.grey100};
      border-color: ${theme.colors[color]};
      color: ${theme.colors[color]};
      opacity: 0.9;
      box-shadow: ${theme.shadows.md};
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
