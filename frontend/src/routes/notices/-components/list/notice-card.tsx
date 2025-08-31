import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'
import { Flex } from '~/components/layout/flex'
import { css } from '@emotion/react'
import { Button } from '~/components/ui/button'
import { Building2, Calendar } from 'lucide-react'

import type { Prettify } from '~/types/prettify'
import type { NoticesResponse } from '~/queries/notices/notices.type'
import { NOTICE_CATEGORY_OPTIONS } from '../../-constants/notice-category-options'
import { Dot } from '~/components/ui/dot'
import { Link } from '@tanstack/react-router'

export function NoticeCard({ notice }: { notice: Prettify<NoticesResponse['data'][number]> }) {
  const categoryMeta =
    NOTICE_CATEGORY_OPTIONS.find((category) => category.value === notice.category) ??
    NOTICE_CATEGORY_OPTIONS.find((category) => category.value === '기타')!

  return (
    <Card variant="basic" as="li" p="xl" minHeight="280px">
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color={categoryMeta.color} size="md" />
          <Text fontSize="sm" fontWeight="semibold">
            {categoryMeta.label}
          </Text>
        </Flex>
        <Text fontSize="md" fontWeight="bold">
          {notice.title}
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
          {notice.description}
        </Text>

        <Flex align="center" gap="xs">
          <Building2 size={16} color="var(--grey-600)" />
          <Text fontSize="sm" fontWeight="regular" p="xs" color="grey600">
            {notice.supervisingInstitution}
          </Text>
        </Flex>
        {notice.startDate && notice.endDate && (
          <Flex align="center" gap="xs">
            <Calendar size={16} color="var(--grey-600)" />
            <Text fontSize="sm" fontWeight="regular" p="xs" color="grey600">
              {notice.startDate} ~ {notice.endDate}
            </Text>
          </Flex>
        )}
        <Link
          to="/notices/$id"
          params={{
            id: String(notice.id),
          }}
        >
          <Button size="sm">
            <Text fontSize="sm" fontWeight="semibold">
              자세히 보기
            </Text>
          </Button>
        </Link>
      </Flex>
    </Card>
  )
}
