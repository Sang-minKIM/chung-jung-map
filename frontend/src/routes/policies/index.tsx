import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { getPoliciesQueryOptions } from '~/queries/policies/policies.query'
import { PoliciesSearchSchema } from '~/queries/policies/policies.type'
import { queryClient } from '~/queries/query-client'

export const Route = createFileRoute('/policies/')({
  validateSearch: PoliciesSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps }) => queryClient.ensureQueryData(getPoliciesQueryOptions(deps.search)),
  component: () => <Policies />,
})

function Policies() {
  const search = Route.useSearch()

  const {
    data: { data: policies },
  } = useSuspenseQuery(getPoliciesQueryOptions(search))

  console.log(policies)

  return (
    <div>
      {policies?.map((policy) => (
        <div key={policy.id}>{policy.title}</div>
      ))}
    </div>
  )
}
