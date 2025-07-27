import styled from '@emotion/styled'
import { theme } from '~/styles/theme'
import {
  space,
  layout,
  color,
  typography,
  flexItem,
  gridItem,
  type GridItemProps,
  type FlexItemProps,
} from '~/styles/style-props'

type SpaceKeys = keyof typeof theme.space
type FontSizeKeys = keyof typeof theme.fontSizes
type FontWeightKeys = keyof typeof theme.fontWeights
type ColorKeys = keyof typeof theme.colors

export interface BoxProps extends FlexItemProps, GridItemProps {
  // Spacing
  m?: SpaceKeys | string
  mx?: SpaceKeys | string
  my?: SpaceKeys | string
  mt?: SpaceKeys | string
  mr?: SpaceKeys | string
  mb?: SpaceKeys | string
  ml?: SpaceKeys | string
  p?: SpaceKeys | string
  px?: SpaceKeys | string
  py?: SpaceKeys | string
  pt?: SpaceKeys | string
  pr?: SpaceKeys | string
  pb?: SpaceKeys | string
  pl?: SpaceKeys | string

  // Layout (item-level)
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  minWidth?: string | number
  maxHeight?: string | number
  minHeight?: string | number

  // Color & Typography
  color?: ColorKeys | string
  bg?: ColorKeys | string
  fontSize?: FontSizeKeys | string
  fontWeight?: FontWeightKeys | number
  textAlign?: string

  // Polymorphic
  as?: React.ElementType
}

export const Box = styled.div<BoxProps>(space, layout, color, typography, flexItem, gridItem)
