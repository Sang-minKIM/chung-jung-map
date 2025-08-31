import { Box, type BoxProps } from '~/components/layout/box'
import type { ReactNode } from 'react'
import { css } from '@emotion/react'

export interface TextProps extends BoxProps {
  children?: ReactNode
  as?: 'p' | 'span' | 'pre'
}

export function Text({ as = 'span', fontSize = 'md', color = 'inherit', m = 'none', children, ...rest }: TextProps) {
  return (
    <Box as={as} fontSize={fontSize} color={color} m={m} css={as === 'pre' ? preStyles : undefined} {...rest}>
      {children}
    </Box>
  )
}

const preStyles = css`
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: keep-all;
`
