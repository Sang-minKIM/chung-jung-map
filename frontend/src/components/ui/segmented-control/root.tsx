import React from 'react'
import { Flex } from '~/components/layout/flex'
import { useControllableState } from '~/hooks/use-controllable-state/use-controllable-state'
import { SegmentedContext, type SegmentedContextValue, type Size } from './context'

/**
 * SegmentedControl 컨테이너(단일 선택 루트).
 *
 * - 제어/비제어 모두 지원합니다.
 * - ARIA: role="radiogroup"를 사용합니다.
 *
 * @example 비제어 사용
 * ```tsx
 * <Root defaultValue="inbox">
 *   <Item value="inbox">Inbox</Item>
 *   <Item value="drafts">Drafts</Item>
 * </Root>
 * ```
 *
 * @example 제어 사용
 * ```tsx
 * const [value, setValue] = useState('inbox')
 * return (
 *   <Root value={value} onValueChange={setValue}>
 *     <Item value="inbox">Inbox</Item>
 *     <Item value="drafts">Drafts</Item>
 *   </Root>
 * )
 * ```
 */
export interface SegmentedRootProps<T extends string> extends React.HTMLAttributes<HTMLDivElement> {
  value?: T
  defaultValue?: T
  onValueChange?: (next: T) => void
  size?: Size
  disabled?: boolean
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function Root<T extends string>({
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
  gap = 'sm',
  children,
  ...rest
}: SegmentedRootProps<T>) {
  const [selectedValue, setSelectedValue] = useControllableState<T>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const contextValue: SegmentedContextValue<T> = {
    selectedValue,
    setSelectedValue,
    size,
    disabled,
  }

  return (
    <SegmentedContext.Provider value={contextValue}>
      <Flex role="radiogroup" align="center" gap={gap} {...rest}>
        {children}
      </Flex>
    </SegmentedContext.Provider>
  )
}
