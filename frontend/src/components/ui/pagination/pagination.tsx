import { css, type Theme } from '@emotion/react'
import { Button } from '../button'
import { usePagination } from './hooks/use-pagination'
import { ELLIPSIS } from './constants/ellipsis'
import { Flex } from '~/components/layout/flex'

export interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  maxDisplayedPages?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxDisplayedPages = 5,
  size = 'md',
  className,
}: PaginationProps) {
  const { pages } = usePagination({
    totalItems,
    itemsPerPage,
    currentPage,
    maxDisplayedPages,
  })

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  return (
    <Flex as="nav" justify="center" align="center" gap="sm" className={className} aria-label="페이지네이션">
      {pages.map((page, index) => {
        if (page === ELLIPSIS) {
          return <Ellipsis key={`ellipsis-${index}`} />
        }
        const isCurrentPage = page === currentPage
        return (
          <Button
            key={page}
            variant={isCurrentPage ? 'primary' : 'outline'}
            size={size}
            onClick={() => handlePageClick(page)}
            aria-label={`페이지 ${page}로 이동`}
            aria-current={isCurrentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        )
      })}
    </Flex>
  )
}

function Ellipsis() {
  return (
    <span css={ellipsisStyles} aria-hidden="true">
      {ELLIPSIS}
    </span>
  )
}

const ellipsisStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  min-height: 2rem;
  color: ${theme.colors.grey500};
  font-size: ${theme.fontSizes.sm};
  user-select: none;
`
