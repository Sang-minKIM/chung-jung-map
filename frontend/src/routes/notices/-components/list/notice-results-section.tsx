import { Text } from '~/components/typo/text'

import { Route } from '~/routes/notices'
import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getNoticesQueryOptions } from '~/queries/notices/notices.query'
import { NoticeCard } from './notice-card'

export function NoticeResultsSection() {
  const search = Route.useSearch()
  const {
    data: { data: notices, policyInfo, pagination },
  } = useSuspenseQuery(getNoticesQueryOptions(search))

  return (
    <Box as="section" py="xl">
      <Text>{policyInfo?.title ? `${policyInfo.title} 관련` : '전체'} 공고 </Text>
      <Text as="span" color="grey500">
        ({pagination.totalCount}개)
      </Text>
      <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg" mt="lg">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </Grid>
    </Box>
  )
}
