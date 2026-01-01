import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppHeader from "@/components/app/app-header";
import AppMain from "@/components/app/app-main";
import AppSideBar from "@/components/app/app-sidebar";
import { AsideChatSidebar } from "@/views/chat/chat";
import { AsideChatHeader } from "@/views/chat/header";
import { Separator } from "@/components/ui/separator";

const RootLayout = () => (
  <>
    <div className="size-full">
      <AppHeader />
      <section className="flex border-t h-[calc(100vh-var(--app-header-height))]">
        <AppSideBar>
          <AsideChatHeader />
          <Separator />
          <AsideChatSidebar />
        </AppSideBar>
        <AppMain>
          <Outlet />
        </AppMain>
      </section>
      <TanStackRouterDevtools />
    </div>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
