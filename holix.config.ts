import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "path"

// @ts-ignore
export default {
  app: {
    entry: 'src/main.ts', // 客户端入口
  },
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  vitePlugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss()
  ],
}
