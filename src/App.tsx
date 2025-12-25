import { ThemeProvider } from "@/components/theme-provider";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} defaultPreload="intent" />
      <TanStackRouterDevtools router={router} />
    </ThemeProvider>
  );
}
