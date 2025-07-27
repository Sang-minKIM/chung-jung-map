import styled from '@emotion/styled'
import {
  space,
  layout,
  color,
  typography,
  flexItem,
  gridItem,
  type GridItemProps,
  type FlexItemProps,
  type SpaceProps,
  type LayoutProps,
  type ColorProps,
  type TypographyProps,
} from '~/styles/style-props'

export interface BoxProps extends SpaceProps, LayoutProps, ColorProps, TypographyProps, FlexItemProps, GridItemProps {
  as?: React.ElementType
}

export const Box = styled.div<BoxProps>(space, layout, color, typography, flexItem, gridItem)
