import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getNoticesQueryOptions } from '~/queries/notices/notices.query'
import { NoticesSearchSchema } from '~/queries/notices/notices.type'

export const Route = createFileRoute('/notices/')({
  validateSearch: NoticesSearchSchema,
  // loader: () => queryClient.ensureQueryData(getNoticesQueryOptions()),
  component: () => <Notices />,
})

function Notices() {
  const { data } = useSuspenseQuery(getNoticesQueryOptions())
  console.log(data)
  return <></>
}
