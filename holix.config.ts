import { defineHolixConfig } from '@holix/cli/config'
import react from '@vitejs/plugin-react'

export default defineHolixConfig({
  app: {
    entry: 'src/main.ts', // 客户端入口
  },
  vitePlugins: [react() as any], // Vite 插件
})
