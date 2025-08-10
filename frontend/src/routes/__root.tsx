import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Flex } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'
import { Dot } from '~/components/ui/dot'
import { Header } from '~/components/ui/header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Flex gap="md" justify="center" align="center" height="500px">
        <Card variant="basic" height="100px" width="100px">
          <Text>
            <Dot color="red" size="lg" />
            Basic
          </Text>
        </Card>
        <Card variant="surface" height="100px" width="100px">
          <Text>Surface</Text>
        </Card>
        <Card variant="accent" height="100px" width="100px">
          <Text>Accent</Text>
        </Card>
      </Flex>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
