import z from 'zod'
import type { ListResponse } from '~/queries/types'

export const PoliciesSearchSchema = z.object({
  keyword: z.string().optional(),
  category: z.enum(['주거', '금융', '일자리', '창업', '교육', '복지']).optional(),
  region: z.string().optional(),
  target: z.enum(['청년', '대학생', '구직자', '창업자']).optional(),
  status: z.enum(['진행중', '마감', '예정']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().default(100),
})

export type PoliciesSearch = z.infer<typeof PoliciesSearchSchema>

export type Policy = {
  id: string
  title: string
  category: string
  targetGroup: string
}

type PoliciesFilters = {
  category: string | null
  subCategory: string | null
  targetGroup: string | null
  search: string | null
}

export type PoliciesResponse = ListResponse<Policy, PoliciesFilters>
