import { Card } from '~/components/ui/card'
import { PolicyCategoryFilter } from './policy-category-filter'
import { PolicySearchField } from './policy-search-field'
import { Flex } from '~/components/layout/flex'

export function PolicySearchSection() {
  return (
    <Card as="section" py="lg" px="xl">
      <Flex direction="column" gap="lg">
        <PolicySearchField />
        <PolicyCategoryFilter />
      </Flex>
    </Card>
  )
}
