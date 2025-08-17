import { createFileRoute } from '@tanstack/react-router'
import { getPoliciesQueryOptions } from '~/queries/policies/policies.query'
import { PoliciesSearchSchema } from '~/queries/policies/policies.type'
import { queryClient } from '~/queries/query-client'
import { PolicySearchSection } from './-components/search/policy-search-section'
import { PolicyResultsSection } from './-components/list'
import { Suspense } from 'react'

export const Route = createFileRoute('/policies/')({
  validateSearch: PoliciesSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps }) => queryClient.ensureQueryData(getPoliciesQueryOptions(deps.search)),
  component: () => <Policies />,
})

function Policies() {
  return (
    <>
      <PolicySearchSection />
      <Suspense fallback={<div>Loading...</div>}>
        <PolicyResultsSection />
      </Suspense>
    </>
  )
}
