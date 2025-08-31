import type { NoticesSearchParams } from './notices.type'

export const NOTICES_ENDPOINT = {
  default: '/notices',
  list: () => NOTICES_ENDPOINT.default,
}

export const NOTICES_KEY = {
  default: ['notices'],
  list: (params?: NoticesSearchParams) => [...NOTICES_KEY.default, 'list', params],
}
