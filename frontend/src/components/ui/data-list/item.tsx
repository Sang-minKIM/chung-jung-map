import { type ComponentProps } from 'react'
import { Flex } from '~/components/layout/flex'

/**
 * DataList 아이템 컴포넌트
 * dt, dd의 정렬을 위해 사용합니다.
 */

export function Item({ children, ...rest }: ComponentProps<typeof Flex>) {
  return (
    <Flex align="center" {...rest}>
      {children}
    </Flex>
  )
}
