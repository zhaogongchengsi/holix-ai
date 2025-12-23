import { app } from 'electron'
import { AppWindow } from './node/window'
import { migrateDb } from './node/database/connect'
import { logger } from './node/logger'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let window: AppWindow | null = null
const gotSingleInstanceLock = app.requestSingleInstanceLock()

if (!gotSingleInstanceLock) {
	app.quit()
}

async function bootstrap() {
	await app.whenReady()
	window = new AppWindow()
	await migrateDb()

	app.on('second-instance', () => {
		logger.info('Second instance detected. Bringing the main window to the front.')
		if (window?.isMinimized()) {
			window?.restore()
		}
		window?.focus()
	})

	await window.showWhenReady()
}

bootstrap()
.catch((err) => {
	logger.error('Failed to setup application:', err)
})