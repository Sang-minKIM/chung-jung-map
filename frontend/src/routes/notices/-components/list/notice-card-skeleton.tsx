import { Card } from '~/components/ui/card'
import { Flex } from '~/components/layout/flex'
import { Button } from '~/components/ui/button'

import { Dot } from '~/components/ui/dot'
import { Skeleton } from '~/components/ui/skeleton'

export function NoticeCardSkeleton() {
  return (
    <Card variant="basic" as="li" p="xl" minHeight="280px">
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color="grey500" size="md" />
          <Skeleton>lorem</Skeleton>
        </Flex>

        <Skeleton height="20px">lorem ipsum dolor sit amet.</Skeleton>

        <Skeleton>
          lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.
        </Skeleton>

        <Skeleton>lorem ipsum dolor sit amet.</Skeleton>
        <Skeleton>lorem ipsum dolor sit amet.</Skeleton>

        <Skeleton width="100px">
          <Button size="sm">lorem</Button>
        </Skeleton>
      </Flex>
    </Card>
  )
}
