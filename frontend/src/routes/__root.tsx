import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '~/components/ui/header'
import { Footer } from '~/components/ui/footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
})
