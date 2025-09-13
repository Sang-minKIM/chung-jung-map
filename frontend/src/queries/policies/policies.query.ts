import { queryOptions } from '@tanstack/react-query'
import { POLICIES_ENDPOINT, POLICIES_KEY } from './policies.model'
import { request } from '../request'
import type { PoliciesResponse, Policy } from './policies.type'

export const getPoliciesQueryOptions = () =>
  queryOptions<PoliciesResponse>({
    queryKey: POLICIES_KEY.list(),
    queryFn: () => request(POLICIES_ENDPOINT.list()),
  })

export const getPolicyDetailQueryOptions = (id: string) =>
  queryOptions<Policy>({
    queryKey: POLICIES_KEY.detail(id),
    queryFn: () => request(POLICIES_ENDPOINT.detail(id)),
  })
