import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { Grid } from '~/components/layout/grid'
import { Text } from '~/components/typo/text'
import { Tag } from '~/components/ui/tag'
import { getPolicyDetailQueryOptions } from '../-queries/policies.query'
import { getNoticesQueryOptions } from '~/routes/notices/-exports/queries'
import { NoticeCard } from '~/routes/notices/-exports/components'
import { InfoCard } from '~/components/ui/info-card'
import { AdditionalNoticeCard } from './-compoenents/additional-notice-card'

export const Route = createFileRoute('/policies/$id/')({
  component: () => <PolicyDetail />,
  params: {
    parse: (rawParams) => ({
      id: Number(rawParams.id),
    }),
  },
  loader: ({ params: { id }, context }) => {
    context.queryClient.ensureQueryData(getNoticesQueryOptions({ policyId: id, page: 1, limit: 5 }))
    context.queryClient.ensureQueryData(getPolicyDetailQueryOptions(id))
  },
})

function PolicyDetail() {
  const { id } = Route.useParams()
  const { data: policy } = useSuspenseQuery(getPolicyDetailQueryOptions(id))
  const {
    data: { data: notices },
  } = useSuspenseQuery(getNoticesQueryOptions({ policyId: id, page: 1, limit: 5 }))

  return (
    <Flex as="main" direction="column" gap="xl">
      <Flex as="ul" gap="md">
        <Tag as="li" color="green" size="sm">
          {policy.category}
        </Tag>
        <Tag as="li" color="blue" size="sm">
          {policy.subCategory}
        </Tag>
      </Flex>

      <InfoCard.Root>
        <InfoCard.Heading as="h1" size="lg">
          {policy.title}
        </InfoCard.Heading>
        <InfoCard.Content>
          <Text as="pre">{policy.description}</Text>
        </InfoCard.Content>
      </InfoCard.Root>

      <InfoCard.Root>
        <InfoCard.Heading>지원 대상</InfoCard.Heading>
        <InfoCard.Content>{policy.targetGroup}</InfoCard.Content>
      </InfoCard.Root>

      <InfoCard.Root>
        <InfoCard.Heading as="h2">관련 공고</InfoCard.Heading>
        <InfoCard.Content variant="surface">
          <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
            <AdditionalNoticeCard policyTitle={policy.title} policyId={id} />
          </Grid>
        </InfoCard.Content>
      </InfoCard.Root>
    </Flex>
  )
}
