import { type ComponentProps } from 'react'
import { Text } from '~/components/typo/text'

/**
 * DataList 값 컴포넌트
 * @as dd 태그를 사용합니다.
 */
export function Value({ children, flex = '3', ...rest }: Omit<ComponentProps<typeof Text>, 'as'>) {
  return (
    <Text as="dd" flex={flex} {...rest}>
      {children}
    </Text>
  )
}
