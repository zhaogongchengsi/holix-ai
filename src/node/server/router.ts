import { router } from "./trpc";
import { chatRouter } from "./chat";


// 合并所有路由
export const appRouter = router({
	chat: chatRouter,
	// message: messageRouter,
});

// 导出类型
export type AppRouter = typeof appRouter;
