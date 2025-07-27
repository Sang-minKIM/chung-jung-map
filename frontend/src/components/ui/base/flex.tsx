import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { flexContainer, type FlexContainerProps } from '~/styles/style-props'

export interface FlexProps extends FlexContainerProps, BoxProps {
  children?: ReactNode
}

export const Flex = ({ display = 'flex', children, ...rest }: FlexProps) => {
  return (
    <StyledFlex display={display} {...rest}>
      {children}
    </StyledFlex>
  )
}

const StyledFlex = styled(Box)<FlexProps>(flexContainer)
