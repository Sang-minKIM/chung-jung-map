import { createFileRoute, Link } from '@tanstack/react-router'
import styled from '@emotion/styled'
import { Button } from '~/components/ui/button'

const StyledTitle = styled.h1`
  color: #2563eb;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
`

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <StyledTitle>청년 정책 맵 홈페이지</StyledTitle>
      <div
        css={{
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        추후 랜딩 페이지 업데이트 예정입니다.
        <Link to="/policies">
          <Button>정책 페이지로 이동</Button>
        </Link>
      </div>
    </div>
  ),
})
