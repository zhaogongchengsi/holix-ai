import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting/provider')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setting/provider"!</div>
}
