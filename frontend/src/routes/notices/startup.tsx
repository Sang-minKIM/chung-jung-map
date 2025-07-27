import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const startupNoticeSearchSchema = z.object({
  keyword: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['공고중', '마감', '상담요청']).optional(),
  region: z.string().optional(),
  startupType: z.enum(['사업자등록', '법인설립', '특허출원', '투자유치']).optional(),
  industry: z.enum(['IT', '바이오', '핀테크', '에듀테크', '그린테크']).optional(),
  stage: z.enum(['아이디어', '프로토타입', 'MVP', '초기투자', '시리즈A']).optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(['latest', 'deadline', 'popular']).default('latest'),
})

export const Route = createFileRoute('/notices/startup')({
  validateSearch: startupNoticeSearchSchema,
  component: () => <div>창업 공고</div>,
})