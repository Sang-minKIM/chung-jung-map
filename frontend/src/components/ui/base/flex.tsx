import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { flexContainer, type FlexContainerProps } from '~/styles/style-props'

export interface FlexProps extends FlexContainerProps, BoxProps {
  children?: ReactNode
}

export const Flex = ({
  display = 'flex',
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  children,
  ...rest
}: FlexProps) => {
  return (
    <StyledFlex direction={direction} align={align} justify={justify} {...rest}>
      {children}
    </StyledFlex>
  )
}

const StyledFlex = styled(Box)<FlexProps>(flexContainer)
