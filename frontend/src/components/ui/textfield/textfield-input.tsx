import React from 'react'
import { css, type Theme } from '@emotion/react'

export interface TextFieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  ref?: React.Ref<HTMLInputElement>
}

export function TextFieldInput({ className, ref, ...rest }: TextFieldInputProps) {
  return <input ref={ref} css={inputStyles} className={className} {...rest} />
}

const inputStyles = (theme: Theme) => css`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  padding: ${theme.space.none} ${theme.space.sm};

  &::placeholder {
    color: ${theme.colors.grey500};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
