import z from 'zod'
import type { ListResponse } from '~/queries/types'

const POLICY_CATEGORIES = ['금융', '주거', '일자리', '교육', '생활복지문화', '참여'] as const

export const PoliciesSearchSchema = z.object({
  keyword: z.string().optional(),
  category: z.enum(POLICY_CATEGORIES).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().default(100),
})

export type PoliciesSearch = z.infer<typeof PoliciesSearchSchema>

export type Policy = {
  id: string
  title: string
  category: string
  targetGroup: string
  description: string
}

type PoliciesFilters = {
  category: (typeof POLICY_CATEGORIES)[number] | null
  search: string | null
}

export type PoliciesResponse = ListResponse<Policy, PoliciesFilters>
