import { queryOptions } from '@tanstack/react-query'
import { NOTICES_ENDPOINT, NOTICES_KEY } from './notices.model'
import { request } from '../request'
import type { NoticesResponse, NoticesSearchParams } from './notices.type'

export const getNoticesQueryOptions = (params?: NoticesSearchParams) =>
  queryOptions<NoticesResponse>({
    queryKey: NOTICES_KEY.list(params),
    queryFn: () => request(NOTICES_ENDPOINT.list(), { params }),
  })
