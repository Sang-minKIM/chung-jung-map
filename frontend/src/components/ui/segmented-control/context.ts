import { createContext, useContext } from 'react'

export type Size = 'sm' | 'md' | 'lg'

export type SegmentedContextValue = {
  selectedValue?: string
  setSelectedValue: (v: string) => void
  size: Size
  disabled?: boolean
}

export const SegmentedContext = createContext<SegmentedContextValue | null>(null)

export function useSegmentedControlContext() {
  const ctx = useContext(SegmentedContext)
  if (!ctx) throw new Error('SegmentedControl components는 <SegmentedControl.Root> 안에서 사용되어야 합니다.')
  return ctx
}
