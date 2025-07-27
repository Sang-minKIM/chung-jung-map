import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const financeNoticeSearchSchema = z.object({
  keyword: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['공고중', '마감', '상담요청']).optional(),
  region: z.string().optional(),
  financeType: z.enum(['대출', '보조금', '투자', '펀드']).optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(['latest', 'deadline', 'popular']).default('latest'),
})

export const Route = createFileRoute('/notices/finance')({
  validateSearch: financeNoticeSearchSchema,
  component: () => <div>금융 공고</div>,
})