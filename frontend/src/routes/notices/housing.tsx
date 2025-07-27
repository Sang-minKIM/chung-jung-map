import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const housingNoticeSearchSchema = z.object({
  keyword: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['공고중', '마감', '상담요청']).optional(),
  region: z.string().optional(),
  housingType: z.enum(['임대주택', '분양주택', '공공임대', '행복주택']).optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(['latest', 'deadline', 'popular']).default('latest'),
})

export const Route = createFileRoute('/notices/housing')({
  validateSearch: housingNoticeSearchSchema,
  component: () => <div>주거 공고</div>,
})