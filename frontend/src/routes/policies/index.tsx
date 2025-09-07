import { createFileRoute } from '@tanstack/react-router'
import { getPoliciesQueryOptions } from '~/queries/policies/policies.query'
import { PoliciesSearchSchema } from './-types/search'
import { PolicySearchSection } from './-components/search/policy-search-section'
import { PolicyResultsSection } from './-components/list'
import { Suspense } from 'react'

export const Route = createFileRoute('/policies/')({
  validateSearch: PoliciesSearchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(getPoliciesQueryOptions()),
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
