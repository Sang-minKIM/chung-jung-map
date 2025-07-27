import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'

export interface TextProps extends BoxProps {
  children?: ReactNode
  as?: 'p' | 'span'
}

export function Text({ as = 'p', fontSize = 'base', color = 'black', children, ...rest }: TextProps) {
  return (
    <Box as={as} fontSize={fontSize} color={color} {...rest}>
      {children}
    </Box>
  )
}
