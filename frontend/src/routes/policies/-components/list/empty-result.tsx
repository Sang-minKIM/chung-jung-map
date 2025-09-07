import { TextSearch } from 'lucide-react'
import { Box } from '~/components/layout/box'
import { Flex } from '~/components/layout/flex'
import { Route } from '../..'
import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'

export function EmptyResult() {
  const search = Route.useSearch()
  return (
    <Box as="section" py="xl">
      <Text>{search.category ?? '전체'} 정책 </Text>
      <Text as="span" color="grey500">
        (0개)
      </Text>
      <Flex direction="column" align="center" justify="center" gap="lg">
        <Card variant="surface" p="md" radius="full">
          <TextSearch size={48} />
        </Card>
        <Text>조건에 맞는 결과가 없습니다.</Text>
        <Text>다른 키워드로 검색하거나 조건을 변경해보세요</Text>
      </Flex>
    </Box>
  )
}
