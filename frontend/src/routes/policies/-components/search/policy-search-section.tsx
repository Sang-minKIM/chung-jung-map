import { Card } from '~/components/ui/card'
import { PolicyCategoryFilter } from './policy-category-filter'

export function PolicySearchSection() {
  return (
    <Card as="section" py="lg" px="xl">
      <PolicyCategoryFilter />
    </Card>
  )
}
