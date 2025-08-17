import { Box, type BoxProps } from '~/components/layout/box'
import type { ReactNode } from 'react'

export interface TextProps extends BoxProps {
  children?: ReactNode
  as?: 'p' | 'span'
}

export function Text({ as = 'span', fontSize = 'md', color = 'inherit', m = 'none', children, ...rest }: TextProps) {
  return (
    <Box as={as} fontSize={fontSize} color={color} m={m} {...rest}>
      {children}
    </Box>
  )
}
