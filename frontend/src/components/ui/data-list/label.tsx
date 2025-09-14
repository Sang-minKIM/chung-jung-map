import { Flex, type FlexProps } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import { useTheme } from '@emotion/react'
import type { LucideIcon } from 'lucide-react'

interface DataListLabelProps extends Omit<FlexProps, 'as'> {
  Icon?: LucideIcon
}
/**
 * DataList 라벨 컴포넌트
 * @as dt 태그를 사용합니다.
 * @color color icon과 text의 색상을 동일하게 설정합니다.
 */
export function Label({ children, Icon, gap = 'sm', flex = '1', color = 'grey500', ...rest }: DataListLabelProps) {
  const theme = useTheme()

  return (
    <Flex as="dt" gap={gap} flex={flex} align="center" color={color} {...rest}>
      {Icon && <Icon size={theme.componentSizes.md.iconSize} color="inherit" />}
      <Text>{children}</Text>
    </Flex>
  )
}
