import { createRouter } from "@holix/router";
import { app, protocol } from "electron";
import { migrateDb } from "./node/database/connect";
import { configRegisterRouter, configStore } from "./node/platform/config";
import { logger } from "./node/platform/logger";
import { AppWindow } from "./node/platform/window";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

protocol.registerSchemesAsPrivileged([
	{
		scheme: "holix",
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

configRegisterRouter(router);

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
	await configStore.init();
	window = new AppWindow();
	router.register(window.webContents.session.protocol);
	await window.showWhenReady();
}

migrateDb();
bootstrap().catch((err) => {
	logger.error("Failed to setup application:", err);
});
