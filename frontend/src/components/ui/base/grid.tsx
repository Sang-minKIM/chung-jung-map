import { Box, type BoxProps } from './box'
import type { ReactNode } from 'react'
import styled from '@emotion/styled'
import { gridContainer, type GridContainerProps } from '~/styles/style-props'

export interface GridProps extends GridContainerProps, BoxProps {
  children?: ReactNode
}

export const Grid = ({ display = 'grid', children, ...rest }: GridProps) => {
  return (
    <StyledGrid display={display} {...rest}>
      {children}
    </StyledGrid>
  )
}

const StyledGrid = styled(Box)<GridProps>(gridContainer)
