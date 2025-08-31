import React from 'react'
import { Link as TanstackLink, type LinkProps as TanstackLinkProps } from '@tanstack/react-router'
import { css, type Theme } from '@emotion/react'
import { Text } from '~/components/typo/text'

type BaseLinkProps = {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  underline?: boolean
  onClick?: () => void
}

export type InternalLinkProps = BaseLinkProps & Omit<TanstackLinkProps, 'children'>

export type ExternalLinkProps = BaseLinkProps & {
  href: string
  target?: string
  rel?: string
}

export type LinkProps = (InternalLinkProps & { href?: undefined }) | (ExternalLinkProps & { to?: undefined })

/**
 * 내부 링크와 외부 링크를 모두 지원하는 Link 컴포넌트
 *
 * @param props.size - 링크 텍스트 크기 ('xs' | 'sm' | 'md' | 'lg' | 'xl'), 기본값: 'md'
 *   - xs: 12px, normal weight
 *   - sm: 14px, normal weight
 *   - md: 16px, normal weight (기본값)
 *   - lg: 20px, normal weight
 *   - xl: 24px, bold weight
 * @param props.underline - 밑줄 표시 여부, 기본값: false
 *
 * **내부 링크용 props:**
 * @param props.to - 네비게이션할 경로 (Tanstack Router path)
 * @param props.search - URL search parameters
 * @param props.hash - URL hash
 * @param props.params - Route parameters
 *
 * **외부 링크용 props:**
 * @param props.href - 외부 링크 URL
 * @param props.target - 링크 타겟, 기본값: '_blank'
 * @param props.rel - 링크 관계, 기본값: 'noopener noreferrer'
 *
 * @example
 * ```tsx
 * // === 내부 링크 사용법 ===
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
 *
 * // === 외부 링크 사용법 ===
 * // 기본 외부 링크 (새 탭에서 열림)
 * <Link href="https://example.com">외부 사이트</Link>
 *
 * // 같은 탭에서 열기
 * <Link href="https://example.com" target="_self">같은 탭</Link>
 *
 * // 사이즈와 스타일 적용
 * <Link href="https://github.com" size="lg" underline>GitHub</Link>
 * ```
 *
 * @remarks
 * - href가 있으면 외부 링크(<a>), to가 있으면 내부 링크(TanStack Router Link)로 자동 처리
 * - 외부 링크는 기본적으로 새 탭에서 열리며 보안을 위해 noopener noreferrer가 적용됨
 * - 호버 시 green 색상으로 변경
 * - Active 상태일 때 green 색상 + bold 폰트 (내부 링크만)
 * - 포커스 시 접근성을 위한 focus ring 표시
 */
export function Link(props: LinkProps) {
  if ('href' in props && props.href) {
    return <ExternalLink {...props} />
  }
  return <InternalLink {...props} />
}

function InternalLink({ children, size = 'md', className, underline = false, onClick, ...rest }: InternalLinkProps) {
  const { fontSize, fontWeight } = getLinkSizeStyles(size)

  return (
    <TanstackLink css={(theme: Theme) => linkStyles(theme, underline)} onClick={onClick} {...rest}>
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

function ExternalLink({
  children,
  size = 'md',
  className,
  underline = false,
  onClick,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  ...rest
}: ExternalLinkProps) {
  const { fontSize, fontWeight } = getLinkSizeStyles(size)

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      css={(theme: Theme) => linkStyles(theme, underline)}
      onClick={onClick}
      {...rest}
    >
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
    </a>
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
