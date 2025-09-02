import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'
import { Flex } from '~/components/layout/flex'
import { Dot } from '~/components/ui/dot'
import { css } from '@emotion/react'
import { Button } from '~/components/ui/button'
import { Building2 } from 'lucide-react'
import type { PoliciesResponse } from '~/queries/policies/policies.type'
import { POLICY_CATEGORY_OPTIONS } from '../../-constants/policy-category-options'
import type { Prettify } from '~/types/prettify'
import { Link } from '@tanstack/react-router'

export function PolicyCard({ policy }: { policy: Prettify<PoliciesResponse['data'][number]> }) {
  const categoryMeta =
    POLICY_CATEGORY_OPTIONS.find((category) => category.value === policy.category) ?? UNDEFINED_CATEGORY

  return (
    <Card variant="surface" key={policy.id} as="li" p="xl" minHeight="280px">
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color={categoryMeta.color} size="md" />
          <Text fontSize="sm" fontWeight="semibold">
            {categoryMeta.label}
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
          <Link to="/notices" search={{ policyId: policy.id }}>
            <Button size="sm">
              <Text fontSize="sm" fontWeight="semibold" p="xs" color="inherit">
                관련 공고 보기
              </Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  )
}

const UNDEFINED_CATEGORY = {
  label: '미분류',
  value: '미분류',
  color: 'grey500',
} as const
