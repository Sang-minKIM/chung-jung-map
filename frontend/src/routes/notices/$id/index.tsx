import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { getNoticeDetailQueryOptions } from '~/routes/notices/-queries/notices.query'
import { NOTICE_CATEGORY_OPTIONS } from '../-constants/notice-category-options'
import { Text } from '~/components/typo/text'
import { Tag } from '~/components/ui/tag'
import { Building2, Calendar, ExternalLink } from 'lucide-react'
import { Link } from '~/components/ui/link'
import { Separator } from '~/components/ui/separator'
import { Separated } from '~/components/kits/separated'
import type { Notice } from '../-queries/notices.type'
import { InfoCard } from '~/components/ui/info-card'
import { DataList } from '~/components/ui/data-list'

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

  return (
    <Flex as="main" direction="column" gap="xl">
      <NoticeTags category={notice.category} regionalInstitution={notice.regionalInstitution} />
      <InfoCard.Root>
        <InfoCard.Heading as="h1" size="lg">
          {notice.title}
        </InfoCard.Heading>
        <InfoCard.Content variant="surface">
          <DataList.Root>
            <Separated by={<Separator size="full" />}>
              {notice.startDate && notice.endDate && (
                <DataList.Item>
                  <DataList.Label Icon={Calendar}>신청 기간</DataList.Label>
                  <DataList.Value>{`${notice.startDate} ~ ${notice.endDate}`}</DataList.Value>
                </DataList.Item>
              )}

              {notice.url && (
                <DataList.Item>
                  <DataList.Label Icon={ExternalLink}>신청 링크</DataList.Label>
                  <DataList.Value>
                    <Link href={notice.url} target="_blank">
                      {notice.url}
                    </Link>
                  </DataList.Value>
                </DataList.Item>
              )}

              {notice.referenceUrl && (
                <DataList.Item>
                  <DataList.Label Icon={ExternalLink}>관련 링크</DataList.Label>
                  <DataList.Value>
                    <Link href={notice.referenceUrl} target="_blank">
                      {notice.referenceUrl}
                    </Link>
                  </DataList.Value>
                </DataList.Item>
              )}

              {notice.supervisingInstitution && (
                <DataList.Item>
                  <DataList.Label Icon={Building2}>주관 기관</DataList.Label>
                  <DataList.Value>{notice.supervisingInstitution}</DataList.Value>
                </DataList.Item>
              )}

              {notice.supervisingInstitution && (
                <DataList.Item>
                  <DataList.Label Icon={Building2}>주관 기관</DataList.Label>
                  <DataList.Value>{notice.supervisingInstitution}</DataList.Value>
                </DataList.Item>
              )}

              {notice.operatingInstitution && (
                <DataList.Item>
                  <DataList.Label Icon={Building2}>운영 기관</DataList.Label>
                  <DataList.Value>{notice.operatingInstitution}</DataList.Value>
                </DataList.Item>
              )}

              {notice.registeringInstitution && (
                <DataList.Item>
                  <DataList.Label Icon={Building2}>등록 기관</DataList.Label>
                  <DataList.Value>{notice.registeringInstitution}</DataList.Value>
                </DataList.Item>
              )}
            </Separated>
          </DataList.Root>
        </InfoCard.Content>
      </InfoCard.Root>

      {notice.description && (
        <InfoCard.Root>
          <InfoCard.Heading>개요</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.description}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}

      {notice.supportContent && (
        <InfoCard.Root>
          <InfoCard.Heading>지원 혜택</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.supportContent}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}

      {notice.applicationMethod && (
        <InfoCard.Root>
          <InfoCard.Heading>신청 절차</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.applicationMethod}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}

      {notice.screeningMethod && (
        <InfoCard.Root>
          <InfoCard.Heading>심사 절차</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.screeningMethod}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}

      {notice.additionalInfo && (
        <InfoCard.Root>
          <InfoCard.Heading>참고 사항</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.additionalInfo}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}

      {notice.requiredDocuments && (
        <InfoCard.Root>
          <InfoCard.Heading>제출 서류</InfoCard.Heading>
          <InfoCard.Content>
            <Text as="pre">{notice.requiredDocuments}</Text>
          </InfoCard.Content>
        </InfoCard.Root>
      )}
    </Flex>
  )
}

function NoticeTags({
  category,
  regionalInstitution,
}: {
  category: Notice['category']
  regionalInstitution: Notice['regionalInstitution']
}) {
  const categoryOption =
    NOTICE_CATEGORY_OPTIONS.find((option) => option.value === category) ??
    NOTICE_CATEGORY_OPTIONS.find((option) => option.value === '기타')!

  return (
    <Flex as="ul" gap="md">
      <Tag as="li" color={categoryOption.color} size="sm">
        {categoryOption.label}
      </Tag>

      {regionalInstitution && (
        <Tag color="blue" size="sm">
          {regionalInstitution}
        </Tag>
      )}
    </Flex>
  )
}
