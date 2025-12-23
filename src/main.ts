import { app } from 'electron'
import { AppWindow } from './node/window'
import { migrateDb } from './node/database/connect'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let window: AppWindow | null = null
const gotSingleInstanceLock = app.requestSingleInstanceLock()

if (!gotSingleInstanceLock) {
	app.quit()
}


async function bootstrap() {
	await app.whenReady()
	await migrateDb()
	window = new AppWindow()
	await window.showWhenReady()
}

bootstrap()
.catch((err) => {
	console.error('Failed to setup application:', err)
})