import { css, useTheme } from '@emotion/react'
import type { ReactNode } from 'react'
import {
  flexContainer,
  space,
  layout,
  color,
  typography,
  flexItem,
  gridItem,
  type FlexContainerProps,
} from '~/styles/style-props'
import type { BoxProps } from './box'

export interface FlexProps extends Omit<FlexContainerProps, 'theme'>, Omit<BoxProps, 'theme'> {
  children?: ReactNode
}

export function Flex({ display = 'flex', children, as: Component = 'div', ...rest }: FlexProps) {
  const theme = useTheme()
  const propsWithTheme = { ...rest, display, theme }

  return (
    <Component
      css={css`
        ${flexContainer(propsWithTheme)}
        ${space(propsWithTheme)}
        ${layout(propsWithTheme)}
        ${color(propsWithTheme)}
        ${typography(propsWithTheme)}
        ${flexItem(propsWithTheme)}
        ${gridItem(propsWithTheme)}
      `}
    >
      {children}
    </Component>
  )
}
