import { css } from '@emotion/react'
import type { ReactNode } from 'react'
import { useGridContainerStyles, type GridContainerProps } from '~/styles/style-props'
import { Box, type BoxProps } from './box'

export interface GridProps extends GridContainerProps, BoxProps {
  children?: ReactNode
}

export const Grid = ({
  display = 'grid',
  children,
  as = 'div',
  templateColumns,
  templateRows,
  gap,
  autoFlow,
  align,
  justify,
  ...rest
}: GridProps) => {
  const gridContainerStyles = useGridContainerStyles({
    ...rest,
    display,
    templateColumns,
    templateRows,
    gap,
    autoFlow,
    align,
    justify,
  })

  const combinedStyles = {
    ...gridContainerStyles,
  }

  return (
    <Box as={as} css={css(combinedStyles)} {...rest}>
      {children}
    </Box>
  )
}
