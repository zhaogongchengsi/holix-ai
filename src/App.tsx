import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { router } from "./router";

export default function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={router} defaultPreload="intent" />
			<TanStackRouterDevtools router={router} />
		</ThemeProvider>
	);
}
