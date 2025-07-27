import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const policySearchSchema = z.object({
  keyword: z.string().optional(),
  category: z.enum(['주거', '금융', '일자리', '창업', '교육', '복지']).optional(),
  region: z.string().optional(),
  target: z.enum(['청년', '대학생', '구직자', '창업자']).optional(),
  status: z.enum(['진행중', '마감', '예정']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(10).max(50).default(20),
})

export const Route = createFileRoute('/policies/')({
  validateSearch: policySearchSchema,
  component: () => <div>정책 안내</div>,
})