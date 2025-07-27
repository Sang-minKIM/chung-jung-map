import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const jobsNoticeSearchSchema = z.object({
  keyword: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['공고중', '마감', '상담요청']).optional(),
  region: z.string().optional(),
  jobType: z.enum(['정규직', '계약직', '인턴', '아르바이트']).optional(),
  industry: z.enum(['IT', '제조업', '서비스업', '공공기관', '스타트업']).optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(['latest', 'deadline', 'popular']).default('latest'),
})

export const Route = createFileRoute('/notices/jobs')({
  validateSearch: jobsNoticeSearchSchema,
  component: () => <div>일자리 공고</div>,
})