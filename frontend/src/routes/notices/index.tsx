import { createFileRoute } from '@tanstack/react-router'
import { NoticesSearchSchema } from '~/queries/notices/notices.type'
import { NoticeResultsSection } from './-components/list'

export const Route = createFileRoute('/notices/')({
  validateSearch: NoticesSearchSchema,
  component: () => <Notices />,
})

function Notices() {
  return (
    <>
      <NoticeResultsSection />
    </>
  )
}
