import React from 'react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { useSegmentedControlContext } from './context'

type SegmentedColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple'

export interface SegmentedItemProps extends Omit<ButtonProps, 'color' | 'variant'> {
  value: string
  color?: SegmentedColor
  disabled?: boolean
  children?: React.ReactNode
}

export function Item({ value, color = 'green', disabled, children, onClick, ...rest }: SegmentedItemProps) {
  const { selectedValue, setSelectedValue, size, disabled: rootDisabled } = useSegmentedControlContext()
  const isSelected = selectedValue === value
  const isDisabled = rootDisabled || disabled

  return (
    <Button
      role="radio"
      aria-checked={isSelected}
      variant={isSelected ? 'primary' : 'outline'}
      color={color}
      size={size}
      disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) return
        setSelectedValue(value)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}
