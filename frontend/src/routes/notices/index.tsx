import { createFileRoute } from '@tanstack/react-router'
import { NoticesSearchSchema } from '~/queries/notices/notices.type'
import { NoticeResultsSection } from './-components/list'
import { Suspense } from 'react'
import { getNoticesQueryOptions } from '~/queries/notices/notices.query'

export const Route = createFileRoute('/notices/')({
  validateSearch: NoticesSearchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(getNoticesQueryOptions()),
  component: () => <Notices />,
})

function Notices() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoticeResultsSection />
    </Suspense>
  )
}
