import { queryOptions } from '@tanstack/react-query'
import { NOTICES_ENDPOINT, NOTICES_KEY } from './notices.model'
import { request } from '../request'
import type { NoticesResponse, NoticesSearchParams } from './notices.type'
import type { Prettify } from '~/types/prettify'

export const getNoticesQueryOptions = (params?: NoticesSearchParams) =>
  queryOptions<Prettify<NoticesResponse>>({
    queryKey: NOTICES_KEY.list(params),
    queryFn: () => request(NOTICES_ENDPOINT.list(), { params }),
  })
