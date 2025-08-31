import type { NoticesSearchParams } from './notices.type'

export const NOTICES_ENDPOINT = {
  default: '/notices',
  list: () => NOTICES_ENDPOINT.default,
  detail: (id: string) => `${NOTICES_ENDPOINT.default}/${id}`,
}

export const NOTICES_KEY = {
  default: ['notices'],
  list: (params?: NoticesSearchParams) => [...NOTICES_KEY.default, 'list', params],
  detail: (id: string) => [...NOTICES_KEY.default, 'detail', id],
}
