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
  margin: 0 auto;
  padding: 0 ${theme.space.lg};

  @media (min-width: 640px) {
    padding: 0 ${theme.space.xl};
  }

  @media (min-width: 1024px) {
    padding: 0 ${theme.space['2xl']};
  }
`
