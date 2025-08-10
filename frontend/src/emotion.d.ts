/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'
import type { MyTheme } from './styles/theme'

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
