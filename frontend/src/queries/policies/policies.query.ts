import { queryOptions } from '@tanstack/react-query'
import { POLICIES_ENDPOINT, POLICIES_KEY } from './policies.model'
import { request } from '../request'
import type { PoliciesResponse, PoliciesSearch } from './policies.type'

export const getPoliciesQueryOptions = (searchParams: PoliciesSearch) =>
  queryOptions<PoliciesResponse>({
    queryKey: POLICIES_KEY.list(searchParams),
    queryFn: () => request(POLICIES_ENDPOINT.list(), { params: searchParams }),
  })
