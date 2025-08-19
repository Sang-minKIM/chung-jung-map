import { useNavigate } from '@tanstack/react-router'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Route } from '../../index'
import type { PoliciesSearch } from '../../-types/search'
import { Dot } from '~/components/ui/dot'
import { Flex } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import type { Prettify } from '~/types/prettify'
import { POLICY_CATEGORY_OPTIONS } from '../../-constants/policy-category-options'

type PolicyCategories = Prettify<NonNullable<PoliciesSearch['category']> | typeof DEFAULT_CATEGORY>

export function PolicyCategoryFilter() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })

  const handleCategoryChange = (category: PolicyCategories) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: category === DEFAULT_CATEGORY ? undefined : category,
      }),
      replace: true,
    })
  }

  return (
    <SegmentedControl.Root wrap="wrap" value={search.category ?? DEFAULT_CATEGORY} onValueChange={handleCategoryChange}>
      <SegmentedControl.Item value={DEFAULT_CATEGORY}>
        <Text fontSize="sm" fontWeight="semibold" color="inherit">
          전체
        </Text>
      </SegmentedControl.Item>
      {POLICY_CATEGORY_OPTIONS.map(({ label, value, color }) => (
        <SegmentedControl.Item key={value} value={value} color={color}>
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

const DEFAULT_CATEGORY = '전체'
