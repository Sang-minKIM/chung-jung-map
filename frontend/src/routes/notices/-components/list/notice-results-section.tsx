import { Text } from '~/components/typo/text'

import { Route } from '~/routes/notices'
import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getNoticesQueryOptions } from '~/queries/notices/notices.query'
import { NoticeCard } from './notice-card'
import { Pagination } from '~/components/ui/pagination'
import { useNavigate } from '@tanstack/react-router'

export function NoticeResultsSection() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const {
    data: { data: notices, policyInfo, pagination },
  } = useSuspenseQuery(getNoticesQueryOptions(search))

  const onPageChange = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
    })
  }

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
      <Pagination
        totalItems={pagination.totalCount}
        itemsPerPage={search.limit}
        currentPage={search.page}
        onPageChange={onPageChange}
      />
    </Box>
  )
}
