import { createFileRoute } from '@tanstack/react-router'
import styled from '@emotion/styled'

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
      <div css={{
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        Emotion CSS-in-JS 테스트
      </div>
    </div>
  ),
})