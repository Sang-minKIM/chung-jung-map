import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          홈
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          서비스 소개
        </Link>
        <Link to="/policies" className="[&.active]:font-bold">
          정책 안내
        </Link>
        <Link to="/notices" className="[&.active]:font-bold">
          공고 목록
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})