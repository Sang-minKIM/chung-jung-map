import { useNavigate } from '@tanstack/react-router'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Route } from '../../index'
import type { PoliciesSearch } from '~/queries/policies/policies.type'
import { Dot } from '~/components/ui/dot'
import { Flex } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import type { Prettify } from '~/types/prettify'

type PolicyCategories = Prettify<NonNullable<PoliciesSearch['category']> | '전체'>

export function PolicyCategoryFilter() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const handleCategoryChange = (category: PolicyCategories) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: category === '전체' ? undefined : category,
        page: 1,
      }),
      replace: true,
    })
  }

  return (
    <SegmentedControl.Root<PolicyCategories>
      wrap="wrap"
      value={search.category ?? '전체'}
      onValueChange={handleCategoryChange}
    >
      <SegmentedControl.Item value="전체">
        <Text fontSize="sm" fontWeight="semibold" color="inherit">
          전체
        </Text>
      </SegmentedControl.Item>
      {CATEGORY_OPTIONS.map(({ label, value, color }) => (
        <SegmentedControl.Item value={value} color={color}>
          <Flex gap="xs" align="center">
            <Dot color={search.category === value ? 'white' : color} size="sm" />
            <Text fontSize="sm" fontWeight="semibold" color="inherit">
              {label}
            </Text>
          </Flex>
        </SegmentedControl.Item>
      ))}
    </SegmentedControl.Root>
  )
}

const CATEGORY_OPTIONS = [
  { label: '일자리', value: '일자리', color: 'red' },
  { label: '주거', value: '주거', color: 'orange' },
  { label: '금융', value: '금융', color: 'yellow' },
  { label: '교육', value: '교육', color: 'blue' },
  { label: '생활복지문화', value: '생활복지문화', color: 'navy' },
  { label: '참여', value: '참여', color: 'purple' },
] as const
