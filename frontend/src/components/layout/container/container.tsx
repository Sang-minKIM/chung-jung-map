import { css, type Theme } from '@emotion/react'
import { Box, type BoxProps } from '../box/box'

export function Container({ children, ...rest }: BoxProps) {
  return (
    <Box css={containerStyles} {...rest}>
      {children}
    </Box>
  )
}

const containerStyles = (theme: Theme) => css`
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 0 ${theme.space.lg};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.space.xl};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.space['2xl']};
  }
`
