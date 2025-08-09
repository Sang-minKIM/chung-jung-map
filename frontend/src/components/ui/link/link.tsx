import React from 'react'
import { Link as TanstackLink, type LinkProps as TanstackLinkProps } from '@tanstack/react-router'
import { css, useTheme } from '@emotion/react'
import { Text } from '../base/text'
import type { Theme } from '~/styles/theme'

export interface LinkProps extends Omit<TanstackLinkProps, 'children'> {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  underline?: boolean
}

export function Link({ children, size = 'md', className, underline = false, ...linkProps }: LinkProps) {
  const theme = useTheme() as Theme
  const { fontSize, fontWeight } = getLinkSizeStyles(size)

  return (
    <TanstackLink css={linkStyles(theme, underline)} className={className} {...linkProps}>
      <Text
        as="span"
        fontSize={fontSize}
        fontWeight={fontWeight as 'normal' | 'bold'}
        color="inherit"
        theme={theme}
        css={textStyles}
      >
        {children}
      </Text>
    </TanstackLink>
  )
}

const getLinkSizeStyles = (size: string) => {
  const sizeMap = {
    xs: { fontSize: 'xs', fontWeight: 'normal' as const },
    sm: { fontSize: 'sm', fontWeight: 'normal' as const },
    md: { fontSize: 'base', fontWeight: 'normal' as const },
    lg: { fontSize: 'lg', fontWeight: 'normal' as const },
    xl: { fontSize: 'xl', fontWeight: 'bold' as const },
  }

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.md
}

const linkStyles = (theme: Theme, underline: boolean) => css`
  text-decoration: ${underline ? 'underline' : 'none'};
  color: inherit;

  &:hover {
    color: ${theme.colors.green};
    text-decoration: ${underline ? 'underline' : 'none'};
  }

  &:focus {
    outline: none;
    box-shadow: ${theme.shadows?.focus || '0 0 0 2px rgba(0, 184, 148, 0.3)'};
    border-radius: 2px;
  }

  &.active {
    color: ${theme.colors.green};
    font-weight: ${theme.fontWeights.bold};
  }
`

const textStyles = css`
  transition: color 0.2s ease-in-out;
`
