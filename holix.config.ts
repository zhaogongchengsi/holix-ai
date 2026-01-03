import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default {
	app: {
		entry: "src/main.ts", // 客户端入口
	},
	alias: {
		"@": path.resolve(__dirname, "./src"),
		"public": path.resolve(__dirname, "./public"),
	},
	vitePlugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/routes",
			generatedRouteTree: "./src/routeTree.gen.ts",
		}),
		react(),
		tailwindcss(),
	],
};
