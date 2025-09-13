import z from 'zod'
import type { PaginationResponse } from '~/types/pagination'

export const NoticesSearchSchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(1000).optional().default(100),
  policyId: z.number().optional(),
})

export type NoticesSearchParams = z.infer<typeof NoticesSearchSchema>

export type Notice = {
  id: number
  title: string
  category: string | null
  description: string | null
  url: string | null
  startDate: string | null
  endDate: string | null
  supportContent: string | null
  additionalInfo: string | null
  operatingInstitution: string | null
  registeringInstitution: string | null
  supervisingInstitution: string | null
  regionalInstitution: string | null
  applicationMethod: string | null
  screeningMethod: string | null
  requiredDocuments: string | null
  referenceUrl: string | null
}

type NoticeListItem = Pick<
  Notice,
  | 'id'
  | 'title'
  | 'category'
  | 'description'
  | 'url'
  | 'startDate'
  | 'endDate'
  | 'supervisingInstitution'
  | 'regionalInstitution'
> & {
  similarity?: number
}

export type NoticesResponse = {
  data: NoticeListItem[]
  pagination: PaginationResponse
  policyInfo?: {
    id: number
    title: string
    searchType: 'vector_similarity'
  }
}
