import { css } from '@emotion/react'
import type { ReactNode } from 'react'
import { useFlexContainerStyles, type FlexContainerProps } from '~/styles/style-props'
import { Box, type BoxProps } from './box'

export interface FlexProps extends FlexContainerProps, BoxProps {
  children?: ReactNode
}

/**
 * Flex 컴포넌트
 * 아래 속성을 사용하여 Flex 컨테이너를 사용할 수 있습니다.
 *
 * @param display flex, inline-flex
 * @param direction row, column, row-reverse, column-reverse
 * @param wrap nowrap, wrap, wrap-reverse
 * @param justify center, start, end, between, around
 * @param align center, start, end, stretch, baseline
 * @param gap xs, sm, md, lg, xl
 *
 * 이외 기본 스타일 속성은 Box 컴포넌트와 동일합니다.
 *
 * @space m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl
 * @layout width, height, minWidth, minHeight, maxWidth, maxHeight, overflow
 * @color color, backgroundColor
 * @typography fontSize, fontWeight, textAlign
 * @flexItem flex, flexBasis, flexGrow, flexShrink, alignSelf
 * @gridItem gridArea, gridColumn, gridRow, justifySelf
 *
 * @param children
 * @param as
 * @param className
 */
export function Flex({
  display = 'flex',
  direction,
  wrap,
  justify,
  align,
  gap,
  children,
  as = 'div',
  className,
  ...rest
}: FlexProps) {
  const flexContainerStyles = useFlexContainerStyles({ direction, wrap, justify, align, gap, display })

  return (
    <Box as={as} css={css(flexContainerStyles)} {...rest} className={className}>
      {children}
    </Box>
  )
}
