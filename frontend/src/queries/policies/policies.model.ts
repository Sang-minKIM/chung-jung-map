import type { PoliciesSearch } from './policies.type'

export const POLICIES_ENDPOINT = {
  default: '/policies',
  list: () => `${POLICIES_ENDPOINT.default}`,
}

export const POLICIES_KEY = {
  default: ['policies'],
  list: (searchParams: PoliciesSearch) => [...POLICIES_KEY.default, searchParams],
}
