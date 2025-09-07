import { Card } from '~/components/ui/card'
import { Flex } from '~/components/layout/flex'
import { Dot } from '~/components/ui/dot'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

export function PolicyCardSkeleton() {
  return (
    <Card variant="surface" as="li" p="xl" minHeight="250px">
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color="grey500" size="md" />
          <Skeleton>lorem</Skeleton>
        </Flex>
        <Skeleton height="20px">lorem ipsum dolor.</Skeleton>
        <Skeleton>
          lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit
          amet.
        </Skeleton>
        <Flex gap="sm">
          <Skeleton>
            <Button size="sm">lorem ipsum</Button>
          </Skeleton>
          <Skeleton>
            <Button size="sm">lorem ipsum</Button>
          </Skeleton>
        </Flex>
      </Flex>
    </Card>
  )
}
