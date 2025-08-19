import z from 'zod'

const POLICY_SEARCH_CATEGORIES = ['금융', '주거', '일자리', '교육', '생활복지문화', '참여'] as const

export const PoliciesSearchSchema = z.object({
  keyword: z.string().optional(),
  category: z.enum(POLICY_SEARCH_CATEGORIES).optional(),
})

export type PoliciesSearch = z.infer<typeof PoliciesSearchSchema>
