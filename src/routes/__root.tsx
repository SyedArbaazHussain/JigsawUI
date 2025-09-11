import BreadCrumbs from '@/components/BreadCrumbs'
import Header from '@/components/Header'
import NotFound from '@/components/NotFound'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <BreadCrumbs separator='/'/>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <NotFound />,
})
