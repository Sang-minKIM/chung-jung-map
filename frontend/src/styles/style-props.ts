import type { CSSProperties } from 'react'
import { useTheme, type Theme } from '@emotion/react'

// ThemeProps 제거하고 각 props 인터페이스를 수정
export interface SpaceProps {
  m?: keyof Theme['space']
  mx?: keyof Theme['space']
  my?: keyof Theme['space']
  mt?: keyof Theme['space']
  mr?: keyof Theme['space']
  mb?: keyof Theme['space']
  ml?: keyof Theme['space']
  p?: keyof Theme['space']
  px?: keyof Theme['space']
  py?: keyof Theme['space']
  pt?: keyof Theme['space']
  pr?: keyof Theme['space']
  pb?: keyof Theme['space']
  pl?: keyof Theme['space']
}

export const useSpaceStyles = (props: SpaceProps) => {
  const theme = useTheme()
  const styles: CSSProperties = {}
  const { m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl } = props
  const getSpace = (value: string | number) => theme.space[value as keyof typeof theme.space] || value

  if (m !== undefined) styles.margin = getSpace(m)
  if (mx !== undefined) {
    styles.marginLeft = getSpace(mx)
    styles.marginRight = getSpace(mx)
  }
  if (my !== undefined) {
    styles.marginTop = getSpace(my)
    styles.marginBottom = getSpace(my)
  }
  if (mt !== undefined) styles.marginTop = getSpace(mt)
  if (mr !== undefined) styles.marginRight = getSpace(mr)
  if (mb !== undefined) styles.marginBottom = getSpace(mb)
  if (ml !== undefined) styles.marginLeft = getSpace(ml)
  if (p !== undefined) styles.padding = getSpace(p)
  if (px !== undefined) {
    styles.paddingLeft = getSpace(px)
    styles.paddingRight = getSpace(px)
  }
  if (py !== undefined) {
    styles.paddingTop = getSpace(py)
    styles.paddingBottom = getSpace(py)
  }
  if (pt !== undefined) styles.paddingTop = getSpace(pt)
  if (pr !== undefined) styles.paddingRight = getSpace(pr)
  if (pb !== undefined) styles.paddingBottom = getSpace(pb)
  if (pl !== undefined) styles.paddingLeft = getSpace(pl)

  return styles
}

export interface LayoutProps {
  width?: string | number
  height?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  overflow?: string
}

export const useLayoutStyles = (props: LayoutProps) => ({
  width: props.width,
  height: props.height,
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  overflow: props.overflow,
})

export interface ColorProps {
  color?: keyof Theme['colors'] | string
  backgroundColor?: keyof Theme['colors'] | string
}

export const useColorStyles = (props: ColorProps) => {
  const theme = useTheme() as Theme
  return {
    color: theme.colors[props.color as keyof typeof theme.colors] || props.color,
    backgroundColor: theme.colors[props.backgroundColor as keyof typeof theme.colors] || props.backgroundColor,
  }
}

export interface TypographyProps {
  fontSize?: keyof Theme['fontSizes'] | string
  fontWeight?: keyof Theme['fontWeights'] | number
  textAlign?: CSSProperties['textAlign']
}

export const useTypographyStyles = (props: TypographyProps) => {
  const theme = useTheme() as Theme
  return {
    fontSize: theme.fontSizes[props.fontSize as keyof typeof theme.fontSizes] || props.fontSize,
    fontWeight: theme.fontWeights[props.fontWeight as keyof typeof theme.fontWeights] || props.fontWeight,
    textAlign: props.textAlign,
  }
}

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
}

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

export interface FlexContainerProps {
  display?: 'flex' | 'inline-flex'
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  align?: keyof typeof alignMap
  justify?: keyof typeof justifyMap
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: keyof Theme['space']
}

export const useFlexContainerStyles = (props: FlexContainerProps) => {
  const theme = useTheme() as Theme
  return {
    display: props.display,
    flexDirection: props.direction,
    alignItems: alignMap[props.align as keyof typeof alignMap] || props.align,
    justifyContent: justifyMap[props.justify as keyof typeof justifyMap] || props.justify,
    gap: theme.space[props.gap as keyof typeof theme.space] || props.gap,
    flexWrap: props.wrap,
  }
}

export interface GridContainerProps {
  display?: 'grid' | 'inline-grid'
  templateColumns?: string
  templateRows?: string
  gap?: keyof Theme['space']
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense'
  align?: keyof typeof alignMap
  justify?: keyof typeof justifyMap
}

export const useGridContainerStyles = (props: GridContainerProps) => {
  const theme = useTheme() as Theme
  return {
    display: props.display,
    gridTemplateColumns: props.templateColumns,
    gridTemplateRows: props.templateRows,
    gap: theme.space[props.gap as keyof typeof theme.space] || props.gap,
    gridAutoFlow: props.autoFlow,
    alignItems: props.align,
    justifyItems: props.justify,
  }
}

export interface FlexItemProps {
  flex?: string
  flexBasis?: string
  flexGrow?: string
  flexShrink?: string
  alignSelf?: keyof typeof alignMap
}

export const useFlexItemStyles = (props: FlexItemProps) => {
  return {
    flex: props.flex,
    flexBasis: props.flexBasis,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    alignSelf: alignMap[props.alignSelf as keyof typeof alignMap] || props.alignSelf,
  }
}

export interface GridItemProps {
  gridArea?: string
  gridColumn?: string
  gridRow?: string
  justifySelf?: keyof typeof justifyMap
  alignSelf?: keyof typeof alignMap
}

export const useGridItemStyles = (props: GridItemProps) => {
  return {
    gridArea: props.gridArea,
    gridColumn: props.gridColumn,
    gridRow: props.gridRow,
    justifySelf: justifyMap[props.justifySelf as keyof typeof justifyMap] || props.justifySelf,
    alignSelf: alignMap[props.alignSelf as keyof typeof alignMap] || props.alignSelf,
  }
}
