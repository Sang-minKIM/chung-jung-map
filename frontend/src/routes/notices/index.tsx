import { createFileRoute } from '@tanstack/react-router'
import { NoticesSearchSchema } from '~/routes/notices/-queries/notices.type'
import { NoticeResultsSection, NoticeResultsSkeleton } from './-components/list'
import { Suspense } from 'react'
import { getNoticesQueryOptions } from '~/routes/notices/-queries/notices.query'

export const Route = createFileRoute('/notices/')({
  validateSearch: NoticesSearchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(getNoticesQueryOptions()),
  component: () => <Notices />,
})

function Notices() {
  return (
    <Suspense fallback={<NoticeResultsSkeleton />}>
      <NoticeResultsSection />
    </Suspense>
  )
}
