import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/setting/general')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/setting/general"!</div>
}
