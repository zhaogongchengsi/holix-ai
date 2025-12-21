import { app } from 'electron'
import { AppWindow } from './node/window'

let window: AppWindow | null = null

async function setup() {
	await app.whenReady()
	window = new AppWindow()
	await window.showWhenReady()
}

setup()