import { kyInstance } from "./ky";


export function minimize () {
	kyInstance.post('window/minimize')
}

export function toggleMaximize () {
	kyInstance.post('window/maximize')
}

export function close () {
	kyInstance.post('window/close')
}
