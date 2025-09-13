import { css } from '@emotion/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, MapPin } from 'lucide-react'
import { Flex } from '~/components/layout/flex'
import { Grid } from '~/components/layout/grid'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dot } from '~/components/ui/dot'
import { Link } from '~/components/ui/link'
import { Tag } from '~/components/ui/tag'
import { getPolicyDetailQueryOptions } from '../-queries/policies.query'
import { getNoticesQueryOptions } from '~/routes/notices/-exports/queries'
import { NoticeCard } from '~/routes/notices/-exports/components'

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

      <Heading as="h1" fontSize="lg">
        {policy.title}
      </Heading>

      <InfoSection value={policy.targetGroup} label="지원 대상" />
      <InfoSection value={policy.description} label="내용" />

      <Flex as="section" direction="column" gap="sm">
        <Flex justify="between" align="center">
          <Heading as="h2" fontSize="md" fontWeight="semibold">
            관련 공고
          </Heading>
          <Link to="/notices" search={{ policyId: id }}>
            <Button size="sm" variant="ghost">
              더보기 <ChevronRight size={16} />
            </Button>
          </Link>
        </Flex>

        <Grid as="ul" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
          <Card variant="basic" as="li" p="xl" minHeight="280px">
            <Flex direction="column" justify="between" height="100%">
              <Flex align="center" gap="sm">
                <Dot color="green" size="md" />
                <Text fontSize="sm" fontWeight="semibold">
                  더보기
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="bold">
                관련 공고를 더 보고 싶다면?
              </Text>
              <Text
                fontSize="sm"
                color="grey600"
                css={css`
                  line-height: 1.6;
                  word-break: keep-all;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                `}
              >
                {policy.title} 정책과 관련된 공고들을 모아봤어요. AI 기반 유사도 측정 기술을 통해 비슷한 공고들을
                추천해드려요.
              </Text>

              <Flex align="center" gap="xs">
                <MapPin size={16} color="var(--grey-600)" />
                <Text fontSize="sm" fontWeight="regular" p="xs" color="grey600">
                  청정맵
                </Text>
              </Flex>

              <Link
                to="/notices"
                search={{
                  policyId: id,
                }}
              >
                <Button size="sm">
                  <Text fontSize="sm" fontWeight="semibold">
                    공고 더보기
                  </Text>
                </Button>
              </Link>
            </Flex>
          </Card>
        </Grid>
      </Flex>
    </Flex>
  )
}

function InfoSection({ value, label }: { value: string; label: string }) {
  return (
    <Flex as="section" direction="column" gap="sm">
      <Heading as="h2" fontSize="md" fontWeight="semibold">
        {label}
      </Heading>
      <Card p="xl" as="article">
        <Text as="pre">{value}</Text>
      </Card>
    </Flex>
  )
}
