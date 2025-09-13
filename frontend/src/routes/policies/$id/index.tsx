import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'
import { Tag } from '~/components/ui/tag'
import { getPolicyDetailQueryOptions } from '~/queries/policies/policies.query'

export const Route = createFileRoute('/policies/$id/')({
  component: () => <PolicyDetail />,
  loader: ({ params: { id }, context }) => {
    return context.queryClient.ensureQueryData(getPolicyDetailQueryOptions(id))
  },
})

function PolicyDetail() {
  const { id } = Route.useParams()
  const { data: policy } = useSuspenseQuery(getPolicyDetailQueryOptions(id))

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
