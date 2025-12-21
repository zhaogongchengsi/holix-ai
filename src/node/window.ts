
import { BrowserWindow } from 'electron'

export class AppWindow extends BrowserWindow {
	constructor() {
		super({
			width: 800,
			height: 600,
			show: false,
			frame: import.meta.env.DEV,
		})
		const url = import.meta.env.BASE_URL + 'index.html'
		import.meta.env.DEV ? this.loadURL(url) : this.loadFile(url)
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