import React from 'react'
import { css } from '@emotion/react'
import {
  useSpaceStyles,
  useLayoutStyles,
  useColorStyles,
  useTypographyStyles,
  useFlexItemStyles,
  useGridItemStyles,
  type SpaceProps,
  type LayoutProps,
  type ColorProps,
  type TypographyProps,
  type FlexItemProps,
  type GridItemProps,
} from '~/styles/style-props'

export interface BoxProps extends SpaceProps, LayoutProps, ColorProps, TypographyProps, FlexItemProps, GridItemProps {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
}

/**
 * Box 컴포넌트
 *
 * 아래 속성을 사용하여 스타일을 설정할 수 있습니다.
 * @space m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl
 * @layout width, height, minWidth, minHeight, maxWidth, maxHeight, overflow
 * @color color, backgroundColor
 * @typography fontSize, fontWeight, textAlign
 * @flexItem flex, flexBasis, flexGrow, flexShrink, alignSelf
 * @gridItem gridArea, gridColumn, gridRow, justifySelf
 *
 * @param as
 * @param children
 * @param className
 *
 */
export const Box = ({ as: Component = 'div', children, className, ...rest }: BoxProps) => {
  const {
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    overflow,
    color,
    backgroundColor,
    fontSize,
    fontWeight,
    textAlign,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    alignSelf,
    gridArea,
    gridColumn,
    gridRow,
    justifySelf,
    ...restProps
  } = rest
  const spaceStyles = useSpaceStyles({ m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl })
  const layoutStyles = useLayoutStyles({ width, height, minWidth, minHeight, maxWidth, maxHeight, overflow })
  const colorStyles = useColorStyles({ color, backgroundColor })
  const typographyStyles = useTypographyStyles({ fontSize, fontWeight, textAlign })
  const flexItemStyles = useFlexItemStyles({ flex, flexBasis, flexGrow, flexShrink, alignSelf })
  const gridItemStyles = useGridItemStyles({ alignSelf, gridArea, gridColumn, gridRow, justifySelf })

  const combinedStyles = {
    ...spaceStyles,
    ...layoutStyles,
    ...colorStyles,
    ...typographyStyles,
    ...flexItemStyles,
    ...gridItemStyles,
  }

  return (
    <Component css={css(combinedStyles)} className={className} {...restProps}>
      {children}
    </Component>
  )
}

Box.displayName = 'Box'
