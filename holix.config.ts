import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// @ts-ignore
export default {
  app: {
    entry: 'src/main.ts', // 客户端入口
  },
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  vitePlugins: [react(), tailwindcss()], // Vite 插件
}
