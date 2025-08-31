import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { getNoticeDetailQueryOptions } from '~/queries/notices/notices.query'
import { queryClient } from '~/queries/query-client'

export const Route = createFileRoute('/notices/$id/')({
  component: () => <NoticeDetail />,
  loader: ({ params: { id } }) => {
    return queryClient.ensureQueryData(getNoticeDetailQueryOptions(id))
  },
})

function NoticeDetail() {
  const { id } = Route.useParams()
  const {
    data: { data: notice },
  } = useSuspenseQuery(getNoticeDetailQueryOptions(id))

  return <Suspense fallback={<div>Loading...</div>}></Suspense>
}
