import { useCallback, useState } from 'react'

interface UseControllableStateParams<T> {
  value?: T
  defaultValue?: T
  onChange?: (next: T) => void
}

export function useControllableState<T>(params: UseControllableStateParams<T>) {
  const { value, defaultValue, onChange } = params
  const [internal, setInternal] = useState<T | undefined>(defaultValue)
  const isControlled = value !== undefined
  const state = (isControlled ? value : internal) as T | undefined

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [state, setState] as const
}
