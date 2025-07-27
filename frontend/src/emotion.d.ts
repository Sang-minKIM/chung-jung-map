/// <reference types="@emotion/react/types/css-prop" />

import '@emotion/react'
import { Theme as MyTheme } from './styles/theme'

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
