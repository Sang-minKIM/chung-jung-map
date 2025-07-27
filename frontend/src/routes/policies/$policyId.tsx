import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/policies/$policyId')({
  parseParams: ({ policyId }) => ({
    policyId: z.string().min(1).parse(policyId),
  }),
  component: () => <div>정책 상세 설명</div>,
})