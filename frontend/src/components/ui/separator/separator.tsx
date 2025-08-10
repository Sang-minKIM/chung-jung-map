import { Box } from '~/components/layout/box'
import { css, useTheme, type Theme } from '@emotion/react'

interface SeparatorProps {
  size?: 'sm' | 'md' | 'lg' | 'full'
  orientation?: 'horizontal' | 'vertical'
  color?: keyof Theme['colors']
}

export function Separator({ size = 'md', orientation = 'horizontal', color }: SeparatorProps) {
  const theme = useTheme()
  const separatorStyles = css({
    border: 'none',
    margin: 0,
    flexShrink: 0,
    backgroundColor: color ? theme.colors[color] : theme.colors.grey300,

    ...(orientation === 'horizontal'
      ? {
          height: '1px',
          width: getSeparatorLength(size),
        }
      : {
          width: '1px',
          height: getSeparatorLength(size),
        }),
  })

  return <Box as="hr" css={separatorStyles} />
}

function getSeparatorLength(size: 'sm' | 'md' | 'lg' | 'full'): string {
  switch (size) {
    case 'sm':
      return '16px'
    case 'md':
      return '32px'
    case 'lg':
      return '64px'
    case 'full':
      return '100%'
    default:
      return '16px'
  }
}
