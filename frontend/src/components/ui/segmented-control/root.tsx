import React, { useMemo } from 'react'
import { Flex } from '~/components/layout/flex'
import { useControllableState } from '~/hooks/use-controllable-state/use-controllable-state'
import { SegmentedContext, type SegmentedContextValue, type Size } from './context'

export interface SegmentedRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (next: string) => void
  size?: Size
  disabled?: boolean
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function Root({
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
  gap = 'sm',
  children,
  ...rest
}: SegmentedRootProps) {
  const [selected, setSelected] = useControllableState<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const contextValue = useMemo<SegmentedContextValue>(
    () => ({ selectedValue: selected, setSelectedValue: setSelected, size, disabled }),
    [selected, setSelected, size, disabled]
  )

  return (
    <SegmentedContext.Provider value={contextValue}>
      <Flex role="radiogroup" align="center" gap={gap} {...rest}>
        {children}
      </Flex>
    </SegmentedContext.Provider>
  )
}
