import React from 'react'
import { Link as TanstackLink, type LinkProps as TanstackLinkProps } from '@tanstack/react-router'
import { css, type Theme } from '@emotion/react'
import { Text } from '~/components/typo/text'

export interface LinkProps extends Omit<TanstackLinkProps, 'children'> {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  underline?: boolean
  onClick?: () => void
}

/**
 * Tanstack Router Link 기반 컴포넌트
 *
 * @param props.size - 링크 텍스트 크기 ('xs' | 'sm' | 'md' | 'lg' | 'xl'), 기본값: 'md'
 *   - xs: 12px, normal weight
 *   - sm: 14px, normal weight
 *   - md: 16px, normal weight (기본값)
 *   - lg: 20px, normal weight
 *   - xl: 24px, bold weight
 * @param props.underline - 밑줄 표시 여부, 기본값: false
 * @param props.to - 네비게이션할 경로 (Tanstack Router path)
 * @param props.search - URL search parameters
 * @param props.hash - URL hash
 * @param props.params - Route parameters
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Link to="/">홈</Link>
 *
 * // 크기 조정
 * <Link to="/about" size="lg">서비스 소개</Link>
 *
 * // 밑줄 표시
 * <Link to="/policies" underline>정책 안내</Link>
 *
 * // 강조 링크 (xl은 자동으로 bold)
 * <Link to="/notices" size="xl">📢 공고 목록</Link>
 *
 * // Search params와 함께
 * <Link to="/notices" search={{ category: 'housing' }}>주거 공고</Link>
 * ```
 *
 * @remarks
 * - 버튼을 링크로 할 경우에는 사용하지 말것. Tanstack Router Link를 사용할 것.
 * - 호버 시 green 색상으로 변경
 * - Active 상태일 때 green 색상 + bold 폰트 (Tanstack Router가 자동으로 .active 클래스 추가)
 * - 포커스 시 접근성을 위한 focus ring 표시
 * - 모든 Tanstack Router Link의 기능을 그대로 지원
 */
export function Link({ children, size = 'md', className, underline = false, onClick, ...linkProps }: LinkProps) {
  const { fontSize, fontWeight } = getLinkSizeStyles(size)

  return (
    <TanstackLink css={(theme: Theme) => linkStyles(theme, underline)} onClick={onClick} {...linkProps}>
      <Text
        as="span"
        fontSize={fontSize}
        fontWeight={fontWeight}
        color="inherit"
        css={textStyles}
        className={className}
      >
        {children}
      </Text>
    </TanstackLink>
  )
}

const getLinkSizeStyles = (size: string) => {
  const sizeMap = {
    xs: { fontSize: 'xs', fontWeight: 'regular' as const },
    sm: { fontSize: 'sm', fontWeight: 'regular' as const },
    md: { fontSize: 'base', fontWeight: 'regular' as const },
    lg: { fontSize: 'lg', fontWeight: 'regular' as const },
    xl: { fontSize: 'xl', fontWeight: 'bold' as const },
  }

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.md
}

const linkStyles = (theme: Theme, underline: boolean) => css`
  text-decoration: ${underline ? 'underline' : 'none'};
  color: inherit;

  &:hover {
    color: ${theme.colors.green};
    text-decoration: ${underline ? 'underline' : 'none'};
  }

  &:focus {
    outline: none;
    box-shadow: ${theme.shadows?.focus || '0 0 0 2px rgba(0, 184, 148, 0.3)'};
    border-radius: 2px;
  }

  &.active {
    color: ${theme.colors.green};
    font-weight: ${theme.fontWeights.bold};
  }
`

const textStyles = css`
  transition: color 0.2s ease-in-out;
`
