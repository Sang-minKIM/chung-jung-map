import { css, type Theme, keyframes } from '@emotion/react'
import { Box, type BoxProps } from '~/components/layout/box'

export interface SkeletonProps extends BoxProps {
  loading?: boolean
}

/**
 * 로딩 상태 표현
 * @param children - children을 전달하면 skeleton의 크기가 children에 맞게 지정
 *
 * @example
 * ```tsx
 * // 크기 지정
 * <Skeleton width="48px" height="48px" />
 *
 * // 컴포넌트와 함께 사용
 * <Skeleton>
 *   <Button>Click me</Button>
 * </Skeleton>
 *
 * // 텍스트와 함께 사용
 * <Text>
 *   <Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
 * </Text>
 * ```
 */
export function Skeleton({ children, ...rest }: SkeletonProps) {
  return (
    <Box as="span" css={skeletonStyles} {...rest}>
      {children && <span css={hiddenContentStyles}>{children}</span>}
    </Box>
  )
}

const skeletonPulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`

const skeletonStyles = (theme: Theme) => css`
  display: inline-block;
  background-color: ${theme.colors.grey200};
  border-radius: ${theme.radius.sm};
  animation: ${skeletonPulse} 2s ease-in-out infinite;

  &:empty {
    min-height: 1em;
    min-width: 4em;
  }

  * {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  button,
  input,
  textarea,
  select,
  a,
  [tabindex] {
    pointer-events: none !important;
    opacity: 0.5;
  }
`

const hiddenContentStyles = css`
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  user-select: none;
`
