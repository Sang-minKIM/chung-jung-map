import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'

const noticeSearchSchema = z.object({
  keyword: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  status: z.enum(['공고중', '마감', '상담요청']).optional(),
  region: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(['latest', 'deadline', 'popular']).default('latest'),
})

export const Route = createFileRoute('/notices/')({
  validateSearch: noticeSearchSchema,
  component: () => (
    <div>
      <div>공고 소개</div>
      <div className="mt-4 flex gap-4">
        <Link to="/notices/housing" className="text-blue-600 hover:underline">
          주거 공고
        </Link>
        <Link to="/notices/finance" className="text-blue-600 hover:underline">
          금융 공고
        </Link>
        <Link to="/notices/jobs" className="text-blue-600 hover:underline">
          일자리 공고
        </Link>
        <Link to="/notices/startup" className="text-blue-600 hover:underline">
          창업 공고
        </Link>
      </div>
    </div>
  ),
})