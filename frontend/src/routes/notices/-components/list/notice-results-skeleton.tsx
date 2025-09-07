import { Text } from '~/components/typo/text'

import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { map, pipe, range, toArray } from '@fxts/core'
import { NoticeCardSkeleton } from './notice-card-skeleton'

export function NoticeResultsSkeleton() {
  return (
    <Box as="section" py="xl">
      <Text>공고</Text>
      <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg" mt="lg">
        {pipe(
          range(12),
          map((count) => <NoticeCardSkeleton key={count} />),
          toArray
        )}
      </Grid>
    </Box>
  )
}
