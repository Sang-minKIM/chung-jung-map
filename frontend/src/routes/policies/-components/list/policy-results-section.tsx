import { useSuspenseQuery } from '@tanstack/react-query'
import { Text } from '~/components/typo/text'
import { getPoliciesQueryOptions } from '~/routes/policies/-queries/policies.query'
import { Route } from '../..'
import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { PolicyCard } from './policy-card'

import { filter, pipe, toArray, isUndefined, unless, some, map } from '@fxts/core'
import { PolicyResultsEmpty } from './policy-results-empty'

export function PolicyResultsSection() {
  const search = Route.useSearch()

  const { data: policies } = useSuspenseQuery({
    ...getPoliciesQueryOptions(),
    select: ({ data: policies }) =>
      pipe(
        policies,
        unless(
          () => isUndefined(search.category),
          filter((policy) => policy.category === search.category!)
        ),
        unless(
          () => isUndefined(search.keyword),
          filter((policy) =>
            pipe(
              [policy.title, policy.description],
              map(normalizeText),
              some((field) => pipe(search.keyword!, normalizeText, (keyword) => field.includes(keyword)))
            )
          )
        ),
        toArray
      ),
  })

  const isEmpty = policies.length === 0
  if (isEmpty) {
    return <PolicyResultsEmpty />
  }

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

function normalizeText(text: string) {
  return text.toLowerCase().replace(/\s+/g, '')
}
