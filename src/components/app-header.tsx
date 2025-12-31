import { ModeToggle } from "./mode-toggle";
import WindowControls from "./window-controls";

export default function AppHeader() {
	return (
		<header className="h-(--app-header-height) flex justify-between items-center">
			<h1 className="h-full font-bold flex items-center pl-4">Holix AI</h1>
			<div className="pr-4 flex items-center gap-4">
				<ModeToggle />
				<WindowControls />
			</div>
		</header>
	);
}