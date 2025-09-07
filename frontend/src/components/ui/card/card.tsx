import { css, type Theme } from '@emotion/react'
import React from 'react'
import { type GridItemProps, type FlexItemProps } from '~/styles/style-props'
import { Box, type BoxProps } from '~/components/layout/box'

type CardVariant = 'basic' | 'surface' | 'accent'

export interface CardProps extends FlexItemProps, GridItemProps, BoxProps {
  as?: React.ElementType
  variant?: CardVariant
  radius?: keyof Theme['radius']
  className?: string
  children?: React.ReactNode
}

/**
 * 카드 컴포넌트
 *
 * 아래 속성을 사용하여 카드를 사용할 수 있습니다.
 *
 * @param variant basic, surface, accent
 *
 * @example
 * ```tsx
 * 기본 테두리
 * <Card variant="basic">
 *   <Text>Hello</Text>
 * </Card>
 *
 * 옅은 배경 색, 테두리 없음
 * <Card variant="surface">
 *   <Text>Hello</Text>
 * </Card>
 *
 * 테두리 강조
 * <Card variant="accent">
 *   <Text>Hello</Text>
 * </Card>
 * ```
 */
export function Card({ as = 'div', variant = 'basic', radius = 'md', className, ...rest }: CardProps) {
  return <Box as={as} css={(theme: Theme) => variantStyles[variant](theme, radius)} className={className} {...rest} />
}

const variantStyles = {
  basic: (theme: Theme, radius: keyof Theme['radius']) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.grey200};
    border-radius: ${theme.radius[radius]};
  `,
  surface: (theme: Theme, radius: keyof Theme['radius']) => css`
    background-color: ${theme.colors.grey100};
    border: 1px solid ${theme.colors.grey100};
    border-radius: ${theme.radius[radius]};
  `,
  accent: (theme: Theme, radius: keyof Theme['radius']) => css`
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.green};
    border-radius: ${theme.radius[radius]};
  `,
}
