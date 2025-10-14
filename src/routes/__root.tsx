import NotFound from '@/components/NotFound'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})

