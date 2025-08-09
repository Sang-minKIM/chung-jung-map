import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'

export interface HeadingProps extends BoxProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({
  children,
  as = 'h2',
  fontSize = 'xl',
  fontWeight = 'bold',
  color = 'black',
  ...rest
}: HeadingProps) {
  return (
    <Box as={as} fontSize={fontSize} fontWeight={fontWeight} color={color} {...rest}>
      {children}
    </Box>
  )
}
