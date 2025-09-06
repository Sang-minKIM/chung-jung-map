import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '~/components/ui/header'
import { Footer } from '~/components/ui/footer'
import { Box } from '~/components/layout/box'
import { Container } from '~/components/layout/container'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Box as="main" width="100%" py="lg">
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
})
