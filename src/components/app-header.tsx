import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import WindowControls from "./window-controls";
import AppSetting from "./app-setting";

export default function AppHeader() {
	return (
		<header className="h-(--app-header-height) flex justify-between items-center">
			<h1 className="h-full font-bold flex items-center pl-4">Holix AI</h1>
			<div className="pr-4 flex items-center gap-4">
				<ModeToggle />
				<AppSetting />
				<div className="h-4 w-px">
					<Separator orientation="vertical" className="w-px" />
				</div>
				<WindowControls />
			</div>
		</header>
	);
}