import { css } from '@emotion/react'
import { MapPin } from 'lucide-react'
import { Flex } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Dot } from '~/components/ui/dot'
import { Heading } from '~/components/ui/info-card/heading'
import { Link } from '~/components/ui/link'

interface AdditionalNoticeCardProps {
  policyTitle: string
  policyId: number
}

export function AdditionalNoticeCard({ policyTitle, policyId }: AdditionalNoticeCardProps) {
  return (
    <Card variant="accent" as="li" p="xl" minHeight="280px">
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color="green" size="md" />
          <Text fontSize="sm" fontWeight="semibold">
            더보기
          </Text>
        </Flex>

        <Heading as="h3">관련 공고를 더 보고 싶다면?</Heading>

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
          {policyTitle} 정책과 관련된 공고들을 모아봤어요. AI 기반 유사도 측정 기술을 통해 비슷한 공고들을 추천해드려요.
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
            policyId,
          }}
        >
          <Button size="sm">공고 더보기</Button>
        </Link>
      </Flex>
    </Card>
  )
}
