import styled from '@emotion/styled'

const sizes = {
  sm: '8px',
  md: '12px',
  lg: '16px',
} as const

type DotColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple'

interface DotProps {
  color: DotColor
  size: keyof typeof sizes
}

export const Dot = styled.div<DotProps>`
  width: ${({ size }) => sizes[size ?? 'sm']};
  height: ${({ size }) => sizes[size ?? 'sm']};
  border-radius: 50%;
  background-color: ${({ color, theme }) => theme.colors[color ?? 'green']};
`
