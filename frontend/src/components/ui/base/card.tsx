import { css, type Theme } from '@emotion/react'
import React from 'react'
import { type GridItemProps, type FlexItemProps } from '~/styles/style-props'
import { Box } from './box'

type CardVariant = 'basic' | 'surface' | 'accent'

export interface CardProps extends Omit<FlexItemProps, 'theme'>, Omit<GridItemProps, 'theme'> {
  as?: React.ElementType
  variant?: CardVariant
  className?: string
  children?: React.ReactNode
}

export function Card({ as = 'div', variant = 'basic', className, ...rest }: CardProps) {
  return (
    <Box
      as={as}
      css={(theme: Theme) => [baseCardStyles(theme), variantStyles[variant](theme)]}
      className={className}
      {...rest}
    />
  )
}

const baseCardStyles = (theme: Theme) => css`
  border-radius: ${theme.radius.md};
  padding: ${theme.space.xl};
`

const variantStyles = {
  basic: (theme: Theme) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.grey500};
  `,
  surface: (theme: Theme) => css`
    background-color: ${theme.colors.grey500};
    border: 1px solid ${theme.colors.grey500};
  `,
  accent: (theme: Theme) => css`
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.green};
  `,
}
