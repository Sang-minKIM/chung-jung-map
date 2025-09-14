import { type ComponentProps } from 'react'
import { Flex } from '~/components/layout/flex'

/**
 * InfoCard 컨테이너 컴포넌트
 *
 * @children  `InfoCard.Heading`, `InfoCard.Content`
 * @param rest  `FlexProps`
 *
 */
export function Root({ children, ...rest }: Omit<ComponentProps<typeof Flex>, 'as' | 'direction' | 'gap'>) {
  return (
    <Flex as="section" direction="column" gap="sm" {...rest}>
      {children}
    </Flex>
  )
}
