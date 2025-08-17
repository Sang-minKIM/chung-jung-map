import styled from '@emotion/styled'
import { type Theme } from '@emotion/react'

const sizes = {
  sm: '8px',
  md: '12px',
  lg: '16px',
} as const

interface DotProps {
  color: keyof Theme['colors']
  size: keyof typeof sizes
}

/**
 * dot 컴포넌트
 * @param color 색상 `'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple'`
 * @param size 점의 크기 `'sm' | 'md' | 'lg'`
 *
 * @example
 * ```tsx
 * <Dot color="red" size="sm" />
 * <Dot color="green" size="md" />
 * <Dot color="blue" size="lg" />
 * ```
 */
export const Dot = styled.div<DotProps>`
  width: ${({ size }) => sizes[size ?? 'sm']};
  height: ${({ size }) => sizes[size ?? 'sm']};
  border-radius: 50%;
  background-color: ${({ color, theme }) => theme.colors[color ?? 'green']};
`
