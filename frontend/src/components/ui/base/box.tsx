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
