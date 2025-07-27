import styled from '@emotion/styled'
import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'

interface HeadingProps extends BoxProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({
  children,
  as = 'h2',
  fontSize = 'xl',
  fontWeight = 'bold',
  color = 'black',
  ...rest
}: HeadingProps) {
  return (
    <StyledHeading as={as} {...rest}>
      {children}
    </StyledHeading>
  )
}

const StyledHeading = styled(Box)<HeadingProps>`
  font-size: ${({ theme, fontSize }) => theme.fontSizes[fontSize as keyof typeof theme.fontSizes]};
  font-weight: ${({ theme, fontWeight }) => theme.fontWeights[fontWeight as keyof typeof theme.fontWeights]};
  color: ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors]};
`
