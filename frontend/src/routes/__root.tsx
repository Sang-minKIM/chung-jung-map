import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Flex } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'
import { Card } from '~/components/ui/card'
import { Dot } from '~/components/ui/dot'
import styled from '@emotion/styled'
import { Link } from '~/components/ui/link'
import { Heading } from '~/components/typo/heading'

export const Route = createRootRoute({
  component: () => (
    <Container>
      <Flex as="header" justify="between" align="center">
        <Link to="/">
          <Heading as="h2" fontSize="2xl">
            Logo
          </Heading>
        </Link>
        <Flex as="nav" gap="md">
          <Link to="/policies">정책 안내</Link>
          <Link to="/notices">공고 목록</Link>
        </Flex>
      </Flex>
      <hr />
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
    </Container>
  ),
})

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.lg};

  @media (min-width: 640px) {
    padding: 0 ${({ theme }) => theme.space.xl};
  }

  @media (min-width: 1024px) {
    padding: 0 ${({ theme }) => theme.space['2xl']};
  }
`
