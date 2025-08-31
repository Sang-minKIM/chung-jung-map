import { useMemo } from 'react'
import { ELLIPSIS } from '../constants/ellipsis'
import { pipe, range, toArray } from '@fxts/core'

export interface UsePaginationOptions {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  maxDisplayedPages: number
}

type Pages = (number | typeof ELLIPSIS)[]

export interface UsePaginationReturn {
  pages: Pages
}

/**
 *
 * @param totalItems: 총 아이템 수
 * @param itemsPerPage: 한 페이지당 아이템 수
 * @param currentPage: 현재 페이지
 * @param maxDisplayedPages: 최대로 표시할 페이지 개수
 * @returns 표시할 페이지 번호 배열
 */
export function usePagination({
  totalItems,
  itemsPerPage,
  currentPage,
  maxDisplayedPages,
}: UsePaginationOptions): UsePaginationReturn {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pages = useMemo(() => {
    if (totalPages <= maxDisplayedPages) {
      return pipe(range(FIRST_PAGE, totalPages + 1), toArray)
    }
    const { startPage, endPage } = calculateMiddleSection(currentPage, totalPages, maxDisplayedPages)

    return [
      ...buildFirstSection(startPage),
      ...buildMiddleSection(startPage, endPage),
      ...buildLastSection(endPage, totalPages),
    ]
  }, [currentPage, totalPages, maxDisplayedPages])

  return {
    pages,
  }
}

function calculateMiddleSection(currentPage: number, totalPages: number, maxDisplayedPages: number) {
  const pagesAroundCurrent = Math.floor(maxDisplayedPages / 2)

  let startPage = currentPage - pagesAroundCurrent
  let endPage = currentPage + pagesAroundCurrent

  if (startPage < 1) {
    const offset = 1 - startPage
    startPage = 1
    endPage = Math.min(totalPages, endPage + offset)
  }

  if (endPage > totalPages) {
    const offset = endPage - totalPages
    endPage = totalPages
    startPage = Math.max(1, startPage - offset)
  }

  return { startPage, endPage }
}

function buildFirstSection(startPage: number): Pages {
  if (startPage <= FIRST_PAGE) return []
  if (startPage === FIRST_PAGE + 1) return [FIRST_PAGE]
  return [FIRST_PAGE, ELLIPSIS]
}

function buildMiddleSection(startPage: number, endPage: number) {
  return pipe(range(startPage, endPage + 1), toArray)
}

function buildLastSection(endPage: number, totalPages: number): Pages {
  if (endPage >= totalPages) return []
  if (endPage === totalPages - 1) return [totalPages]
  return [ELLIPSIS, totalPages]
}

const FIRST_PAGE = 1
