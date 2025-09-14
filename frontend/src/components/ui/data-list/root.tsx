import { type ComponentProps } from 'react'
import { Flex } from '~/components/layout/flex'

/**
 * DataList 컨테이너 컴포넌트
 * @as dl 태그를 사용합니다.
 * @direction column으로 고정되어 있고 추후 DataList의 UI 추가 시 변경될 수 있습니다.
 */
export function Root({ children, gap = 'lg', ...rest }: Omit<ComponentProps<typeof Flex>, 'as' | 'direction'>) {
  return (
    <Flex as="dl" direction="column" gap={gap} {...rest}>
      {children}
    </Flex>
  )
}
