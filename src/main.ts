import { createRouter } from "@holix/router";
import { app, protocol } from "electron";
import { initChat } from "./node/chat/init";
import { SCHEME } from "./node/constant";
import { migrateDb } from "./node/database/connect";
import { createChannel } from "./node/platform/channel";
import { onCommandForClient } from "./node/platform/commands";
import { configStore } from "./node/platform/config";
import { logger } from "./node/platform/logger";
import { providerStore } from "./node/platform/provider";
import { AppWindow } from "./node/platform/window";
import { useTrpcRouter } from "./node/server/handler";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

protocol.registerSchemesAsPrivileged([
	{
		scheme: SCHEME,
		privileges: {
			standard: true,
			secure: true,
			supportFetchAPI: true,
			corsEnabled: true,
			allowServiceWorkers: true,
		},
	},
]);

const router = createRouter();
configStore.use(router);
providerStore.use(router);
onCommandForClient(router);
useTrpcRouter(router);
router.get("/channel", createChannel());

let window: AppWindow | null = null;
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
	app.quit();
}

app.on("second-instance", () => {
	logger.info(
		"Second instance detected. Bringing the main window to the front.",
	);
	if (window?.isMinimized()) {
		window?.restore();
	}
	window?.focus();
});

async function bootstrap() {
	await app.whenReady();
	initChat();
	await configStore.init();
	await providerStore.init();
	window = new AppWindow();
	router.register(window.webContents.session.protocol);
	window.use(router);

	await window.showWhenReady();
}

migrateDb();
bootstrap().catch((err) => {
	logger.error("Failed to setup application:", err);
});
