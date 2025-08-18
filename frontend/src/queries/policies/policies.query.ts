import { queryOptions } from '@tanstack/react-query'
import { POLICIES_ENDPOINT, POLICIES_KEY } from './policies.model'
import { request } from '../request'
import type { PoliciesResponse } from './policies.type'

export const getPoliciesQueryOptions = () =>
  queryOptions<PoliciesResponse>({
    queryKey: POLICIES_KEY.list(),
    queryFn: () => request(POLICIES_ENDPOINT.list()),
  })
