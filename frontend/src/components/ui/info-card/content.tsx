import { type ComponentProps } from 'react'
import { Card } from '~/components/ui/card'

/**
 * InfoCard 내용 컴포넌트
 *
 * @param variant `basic` | `surface` | `accent`
 *
 */
export function Content({ children, variant = 'basic', ...rest }: Omit<ComponentProps<typeof Card>, 'p' | 'as'>) {
  return (
    <Card p="xl" as="article" variant={variant} {...rest}>
      {children}
    </Card>
  )
}
