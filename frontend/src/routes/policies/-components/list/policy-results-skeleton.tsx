import { Text } from '~/components/typo/text'

import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { map, pipe, range, toArray } from '@fxts/core'
import { PolicyCardSkeleton } from './policy-card-skeleton'
import { Route } from '../..'

export function PolicyResultsSkeleton() {
  const search = Route.useSearch()
  return (
    <Box as="section" py="xl">
      <Text>{search.category ?? '전체'} 정책 </Text>
      <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg" mt="lg">
        {pipe(
          range(0, 12),
          map((number) => <PolicyCardSkeleton key={number} />),
          toArray
        )}
      </Grid>
    </Box>
  )
}
