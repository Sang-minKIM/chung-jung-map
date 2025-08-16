import { createContext, useContext } from 'react'

export type Size = 'sm' | 'md' | 'lg'

export type SegmentedContextValue<T extends string> = {
  selectedValue?: T
  setSelectedValue: (v: T) => void
  size: Size
  disabled?: boolean
}

export const SegmentedContext = createContext<unknown>(null)

export function useSegmentedControlContext<T extends string>() {
  const ctx = useContext(SegmentedContext) as SegmentedContextValue<T> | null
  if (!ctx) throw new Error('SegmentedControl components는 <SegmentedControl.Root> 안에서 사용되어야 합니다.')
  return ctx
}
