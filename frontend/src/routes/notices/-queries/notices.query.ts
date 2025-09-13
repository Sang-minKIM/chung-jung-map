import { queryOptions } from '@tanstack/react-query'
import { NOTICES_ENDPOINT, NOTICES_KEY } from './notices.model'
import type { NoticesResponse, NoticesSearchParams, Notice } from './notices.type'
import { request } from '~/utils/request'
import type { Prettify } from '~/types/prettify'

export const getNoticesQueryOptions = (params?: NoticesSearchParams) =>
  queryOptions<Prettify<NoticesResponse>>({
    queryKey: NOTICES_KEY.list(params),
    queryFn: () => request(NOTICES_ENDPOINT.list(), { params }),
  })

export const getNoticeDetailQueryOptions = (id: string) =>
  queryOptions<{ data: Prettify<Notice> }>({
    queryKey: NOTICES_KEY.detail(id),
    queryFn: () => request(NOTICES_ENDPOINT.detail(id)),
  })
