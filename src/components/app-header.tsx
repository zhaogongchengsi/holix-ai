import { ModeToggle } from "./mode-toggle";

export default function AppHeader() {
	return (
		<header className="h-(--app-header-height) flex justify-between items-center">
			<h1 className="h-full font-bold flex items-center pl-4">Holix AI</h1>
			<div className="pr-4">
				<ModeToggle />
			</div>
		</header>
	);
}