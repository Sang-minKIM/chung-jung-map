export const POLICIES_ENDPOINT = {
  default: '/policies',
  list: () => `${POLICIES_ENDPOINT.default}`,
}

export const POLICIES_KEY = {
  default: ['policies'],
  list: () => [...POLICIES_KEY.default, 'list'],
}
