import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppHeader from "@/components/app/app-header";
import AppMain from "@/components/app/app-main";
import AppSideBar from "@/components/app/app-sidebar";

const RootLayout = () => (
	<>
		<div className="size-full">
			<AppHeader />
			<section className="flex border-t h-[calc(100vh-var(--app-header-height))]">
				<AppSideBar />
				<AppMain>
					<Outlet />
				</AppMain>
			</section>
			<TanStackRouterDevtools />
		</div>
	</>
);

export const Route = createRootRoute({ component: RootLayout });
