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
  return <Box as={as} css={(theme: Theme) => variantStyles[variant](theme)} className={className} {...rest} />
}

const variantStyles = {
  basic: (theme: Theme) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.grey200};
    border-radius: ${theme.radius.md};
  `,
  surface: (theme: Theme) => css`
    background-color: ${theme.colors.grey100};
    border: 1px solid ${theme.colors.grey100};
    border-radius: ${theme.radius.md};
  `,
  accent: (theme: Theme) => css`
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.green};
    border-radius: ${theme.radius.md};
  `,
}
