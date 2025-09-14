import { type ComponentProps } from 'react'
import { Heading as HeadingComponent } from '~/components/typo/heading'

/**
 * InfoCard 제목 컴포넌트
 *
 * @param as `h1` | `h2` | `h3` | `h4` | `h5` | `h6`
 * @param size `sm` | `md` | `lg` - fontSize, fontWeight 설정
 *
 */
export interface InfoCardHeadingProps extends Omit<ComponentProps<typeof HeadingComponent>, 'fontSize' | 'fontWeight'> {
  size?: 'sm' | 'md' | 'lg'
}

export function Heading({ as = 'h2', size = 'md', children, ...rest }: InfoCardHeadingProps) {
  const sizeConfig = {
    sm: { fontSize: 'sm' as const, fontWeight: 'medium' as const },
    md: { fontSize: 'md' as const, fontWeight: 'semibold' as const },
    lg: { fontSize: 'lg' as const, fontWeight: 'bold' as const },
  }

  return (
    <HeadingComponent as={as} {...sizeConfig[size]} {...rest}>
      {children}
    </HeadingComponent>
  )
}
