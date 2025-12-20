import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null = null

console.log('Main process started')

async function createWindow() {
	await app.whenReady()
	win = new BrowserWindow({
		width: 800,
		height: 600,
	})
	const url = import.meta.env.BASE_URL + 'index.html'

	if (import.meta.env.DEV) {
		win.loadURL(url)
	}
	else {
		win.loadFile(url)
	}

}

createWindow()