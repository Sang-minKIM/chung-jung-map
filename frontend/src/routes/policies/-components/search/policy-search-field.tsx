import { SearchIcon } from 'lucide-react'
import { debounce } from '@fxts/core'
import { TextField } from '~/components/ui/text-field'
import { Route } from '../../index'

export function PolicySearchField() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const onKeywordChange = debounce(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (prev) => ({ ...prev, keyword: value || undefined }),
    })
  }, DEBOUNCE_DELAY_MS)

  return (
    <TextField.Root size="md">
      <TextField.Slot>
        <SearchIcon size={16} />
      </TextField.Slot>
      <TextField.Input
        placeholder="검색어를 입력해주세요."
        defaultValue={search.keyword || ''}
        onChange={onKeywordChange}
      />
    </TextField.Root>
  )
}

const DEBOUNCE_DELAY_MS = 300
