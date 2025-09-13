export const POLICIES_ENDPOINT = {
  default: '/policies',
  list: () => `${POLICIES_ENDPOINT.default}`,
  detail: (id: string) => `${POLICIES_ENDPOINT.default}/${id}`,
}

export const POLICIES_KEY = {
  default: ['policies'],
  list: () => [...POLICIES_KEY.default, 'list'],
  detail: (id: string) => [...POLICIES_KEY.default, 'detail', id],
}
