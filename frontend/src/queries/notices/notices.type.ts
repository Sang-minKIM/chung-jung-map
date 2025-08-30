import z from 'zod'
import type { PaginationResponse } from '../types'

export const NoticesSearchSchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  policyId: z.string().optional(),
})

export type NoticesSearchParams = z.infer<typeof NoticesSearchSchema>

export type Notice = {
  id: number
  title: string
  category: string | null
  source: string | null
  url: string | null
  startDate: string | null
  endDate: string | null
  similarity?: number
}

export type NoticesResponse = {
  data: Notice[]
  pagination: PaginationResponse
  policyInfo?: {
    id: number
    searchType: 'vector_similarity'
  }
}
