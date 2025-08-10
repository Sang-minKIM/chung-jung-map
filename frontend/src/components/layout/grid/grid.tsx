import { css } from '@emotion/react'
import type { ReactNode } from 'react'
import { useGridContainerStyles, type GridContainerProps } from '~/styles/style-props'
import { Box, type BoxProps } from '~/components/layout/box'

export interface GridProps extends GridContainerProps, BoxProps {
  children?: ReactNode
}

/**
 * Grid 컴포넌트
 *
 * 아래 속성을 사용하여 Grid 컨테이너를 사용할 수 있습니다.
 *
 * @param display grid, inline-grid
 * @param templateColumns grid-template-columns
 * @param templateRows grid-template-rows
 * @param gap xs, sm, md, lg, xl
 * @param autoFlow row, column, dense, row dense, column dense
 * @param align center, start, end, stretch, baseline
 * @param justify center, start, end, between, around
 *
 * 이외 기본 스타일 속성은 Box 컴포넌트와 동일합니다.
 *
 * @space m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl
 * @layout width, height, minWidth, minHeight, maxWidth, maxHeight, overflow
 * @color color, backgroundColor
 * @typography fontSize, fontWeight, textAlign
 *
 */
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
