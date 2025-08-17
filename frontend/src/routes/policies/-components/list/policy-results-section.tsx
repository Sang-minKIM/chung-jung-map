import { useSuspenseQuery } from '@tanstack/react-query'
import { Text } from '~/components/typo/text'
import { getPoliciesQueryOptions } from '~/queries/policies/policies.query'
import { Route } from '../..'
import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { PolicyCard } from './policy-card'

export function PolicyResultsSection() {
  const search = Route.useSearch()

  const {
    data: { data: policies },
  } = useSuspenseQuery(getPoliciesQueryOptions(search))

  return (
    <Box as="section" py="xl">
      <Text>{search.category ?? '전체'} 정책 </Text>
      <Text as="span" color="grey500">
        ({policies.length}개)
      </Text>
      <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg" mt="lg">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </Grid>
    </Box>
  )
}
