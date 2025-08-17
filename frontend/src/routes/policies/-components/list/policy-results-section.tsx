import { useSuspenseQuery } from '@tanstack/react-query'
import { Text } from '~/components/typo/text'
import { getPoliciesQueryOptions } from '~/queries/policies/policies.query'
import { Route } from '../..'
import { Box } from '~/components/layout/box'
import { Grid } from '~/components/layout/grid'
import { Card } from '~/components/ui/card'
import { Flex } from '~/components/layout/flex'
import { Dot } from '~/components/ui/dot'
import { css } from '@emotion/react'
import { Button } from '~/components/ui/button'
import { Building2 } from 'lucide-react'

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
          <Card variant="surface" key={policy.id} as="li" p="xl" minHeight="280px">
            <Flex direction="column" justify="between" height="100%">
              <Flex align="center" gap="sm">
                <Dot color="green" size="md" />
                <Text fontSize="sm" fontWeight="semibold">
                  {policy.category}
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="bold">
                {policy.title}
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
                  overflow: hidden;
                `}
              >
                {policy.description}
              </Text>

              <Flex align="center" gap="xs">
                <Building2 size={16} color="var(--grey-600)" />
                <Text fontSize="sm" fontWeight="regular" p="xs" color="grey600">
                  추후 기관명 추가
                </Text>
              </Flex>
              <Flex gap="sm">
                <Button variant="outline" size="sm">
                  <Text fontSize="sm" fontWeight="semibold" p="xs">
                    자세히 보기
                  </Text>
                </Button>
                <Button size="sm">
                  <Text fontSize="sm" fontWeight="semibold" p="xs" color="inherit">
                    관련 공고 보기
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}
