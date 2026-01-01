import { getConfig } from '@/lib/config';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/setting/provider")({
  component: RouteComponent,
  loader: async () => {
    const config = await getConfig();
    return config;
  },
});

function RouteComponent() {

  const config = Route.useLoaderData();

  console.log('Config data in /setting/provider:', config);

  return <div>Hello "/setting/provider"!</div>
}
