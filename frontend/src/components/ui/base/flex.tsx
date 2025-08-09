import { css } from '@emotion/react'
import type { ReactNode } from 'react'
import { useFlexContainerStyles, type FlexContainerProps } from '~/styles/style-props'
import { Box, type BoxProps } from './box'

export interface FlexProps extends FlexContainerProps, BoxProps {
  children?: ReactNode
}

export function Flex({
  display = 'flex',
  children,
  as = 'div',
  direction,
  wrap,
  justify,
  align,
  gap,
  ...rest
}: FlexProps) {
  const flexContainerStyles = useFlexContainerStyles({ direction, wrap, justify, align, gap, display })

  return (
    <Box as={as} css={css(flexContainerStyles)} {...rest}>
      {children}
    </Box>
  )
}
