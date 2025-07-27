import { type Theme } from './theme'

type StyleProps = { theme: Theme } & { [key: string]: any }

export const space = (props: StyleProps) => {
  const styles: { [key: string]: any } = {}
  const { theme, m, mx, my, mt, mr, mb, ml, p, px, py, pt, pr, pb, pl } = props
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

export const layout = (props: StyleProps) => ({
  width: props.width,
  height: props.height,
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  display: props.display,
  overflow: props.overflow,
})

export const color = (props: StyleProps) => ({
  color: props.theme.colors[props.color as keyof typeof props.theme.colors] || props.color,
  backgroundColor: props.theme.colors[props.bg as keyof typeof props.theme.colors] || props.bg,
})

export const typography = (props: StyleProps) => ({
  fontSize: props.theme.fontSizes[props.fontSize as keyof typeof props.theme.fontSizes] || props.fontSize,
  fontWeight: props.theme.fontWeights[props.fontWeight as keyof typeof props.theme.fontWeights] || props.fontWeight,
  textAlign: props.textAlign,
})

export const flexbox = (props: StyleProps) => ({
  flexDirection: props.direction,
  alignItems: props.align,
  justifyContent: props.justify,
  gap: props.theme.space[props.gap as keyof typeof props.theme.space] || props.gap,
  flex: props.flex,
  flexBasis: props.basis,
  flexGrow: props.grow,
  flexShrink: props.shrink,
})
