export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ListResponse<TData, TFilters> = {
  success: boolean
  data: TData[]
  pagination: Pagination
  filters: TFilters
  message?: string
}

export type ListSearchParams<TFilters> = {
  page: number
  limit: number
  search?: string
} & TFilters
