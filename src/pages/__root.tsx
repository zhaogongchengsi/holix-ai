import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <div className="size-full">
      <Outlet />
    </div>
  </>
);


export const Route = createRootRoute({ component: RootLayout });