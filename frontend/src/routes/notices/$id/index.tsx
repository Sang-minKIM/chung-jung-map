import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { getNoticeDetailQueryOptions } from '~/routes/notices/-queries/notices.query'
import { NOTICE_CATEGORY_OPTIONS } from '../-constants/notice-category-options'
import { Text } from '~/components/typo/text'
import { Tag } from '~/components/ui/tag'
import { Card } from '~/components/ui/card'
import { Building2, Calendar, ExternalLink, type LucideIcon } from 'lucide-react'
import { Link } from '~/components/ui/link'
import { useTheme } from '@emotion/react'
import { Separator } from '~/components/ui/separator'
import { Box } from '~/components/layout/box'
import { isNull, map, pipe, reject, toArray } from '@fxts/core'
import { Separated } from '~/components/kits/separated'

export const Route = createFileRoute('/notices/$id/')({
  component: () => <NoticeDetail />,
  loader: ({ params: { id }, context }) => {
    return context.queryClient.ensureQueryData(getNoticeDetailQueryOptions(id))
  },
})

function NoticeDetail() {
  const { id } = Route.useParams()
  const {
    data: { data: notice },
  } = useSuspenseQuery(getNoticeDetailQueryOptions(id))

  const categoryMeta =
    NOTICE_CATEGORY_OPTIONS.find((category) => category.value === notice.category) ??
    NOTICE_CATEGORY_OPTIONS.find((category) => category.value === '기타')!

  const coreDataList = [
    {
      label: '신청 기간',
      value: notice.startDate && notice.endDate ? `${notice.startDate} ~ ${notice.endDate}` : null,
      Icon: Calendar,
      type: 'text',
    },
    { label: '신청 링크', value: notice.url, Icon: ExternalLink, type: 'link' },
    { label: '관련 링크', value: notice.referenceUrl, Icon: ExternalLink, type: 'link' },
    { label: '주관 기관', value: notice.supervisingInstitution, Icon: Building2, type: 'text' },
    { label: '운영 기관', value: notice.operatingInstitution, Icon: Building2, type: 'text' },
    { label: '등록 기관', value: notice.registeringInstitution, Icon: Building2, type: 'text' },
  ]

  const infoSectionDataList = [
    { label: '개요', value: notice.description },
    { label: '지원 혜택', value: notice.supportContent },
    { label: '신청 절차', value: notice.applicationMethod },
    { label: '심사 절차', value: notice.screeningMethod },
    { label: '참고 사항', value: notice.additionalInfo },
    { label: '제출 서류', value: notice.requiredDocuments },
  ]

  return (
    <Flex as="main" direction="column" gap="xl">
      <Flex as="ul" gap="md">
        <Tag as="li" color={categoryMeta.color} size="sm">
          {categoryMeta.label}
        </Tag>

        {notice.regionalInstitution && (
          <Tag color="blue" size="sm">
            {notice.regionalInstitution}
          </Tag>
        )}
      </Flex>

      <Heading as="h1" fontSize="lg">
        {notice.title}
      </Heading>

      <Card p="xl" as="article" variant="surface">
        <Flex direction="column" gap="lg">
          <Separated by={<Separator size="full" />}>
            {pipe(
              coreDataList,
              reject((data) => isNull(data.value)),
              map((data) => {
                if (data.type === 'text') {
                  return <TextData label={data.label} value={data.value!} Icon={data.Icon} />
                } else {
                  return <LinkData label={data.label} href={data.value!} Icon={data.Icon} />
                }
              }),
              toArray
            )}
          </Separated>
        </Flex>
      </Card>

      {pipe(
        infoSectionDataList,
        reject((data) => isNull(data.value)),
        map((data) => {
          return <InfoSection label={data.label} value={data.value!} />
        }),
        toArray
      )}
    </Flex>
  )
}

function TextData({ label, value, Icon }: { label: string; value: string; Icon: LucideIcon }) {
  const theme = useTheme()

  return (
    <Flex>
      <Flex gap="sm" flex="1">
        <Icon size={theme.componentSizes.md.iconSize} color={theme.colors.grey500} />
        <Text color="grey500">{label}</Text>
      </Flex>
      <Text flex="3" fontWeight="medium">
        {value}
      </Text>
    </Flex>
  )
}

function LinkData({ label, href, Icon }: { label: string; href: string; Icon: LucideIcon }) {
  const theme = useTheme()

  return (
    <Flex>
      <Flex gap="sm" flex="1">
        <Icon size={theme.componentSizes.md.iconSize} color={theme.colors.grey500} />
        <Text color="grey500">{label}</Text>
      </Flex>
      <Box flex="3">
        <Link href={href} target="_blank">
          {href}
        </Link>
      </Box>
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
