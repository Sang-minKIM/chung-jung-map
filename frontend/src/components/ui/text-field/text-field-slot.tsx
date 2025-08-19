import React from 'react'
import { css, type Theme } from '@emotion/react'

export interface TextFieldSlotProps {
  children?: React.ReactNode

  className?: string
  ref?: React.Ref<HTMLDivElement>
}

export function TextFieldSlot({ children, className, ref, ...props }: TextFieldSlotProps) {
  return (
    <div ref={ref} css={slotStyles} className={className} {...props}>
      {children}
    </div>
  )
}

const slotStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  pointer-events: none;
  color: ${theme.colors.grey500};
  padding: ${theme.space.sm};
`
