
import { BrowserWindow } from 'electron'
import { configStore } from './config'

const minWidth = 800
const minHeight = 540

export class AppWindow extends BrowserWindow {
	constructor() {
		const { width, height } = configStore.get('window')
		super({
			width: width,
			height: height,
			minWidth,
			minHeight,
			show: false,
			frame: import.meta.env.DEV,
			trafficLightPosition: { x: 10, y: 10 },
		})

		const url = import.meta.env.BASE_URL
		import.meta.env.DEV ? this.loadURL(url) : this.loadFile(url)

		if (import.meta.env.DEV) {
			this.webContents.openDevTools({ mode: "right" })
		}

		this.on('resized', async () => {
			const [width, height] = this.getSize()
			await configStore.set('window', { width, height })
		})
	}
	showWhenReady() {
		return new Promise<void>((resolve) => {
			this.once('ready-to-show', () => {
				this.show()
				resolve()
			})
		})

	}
}