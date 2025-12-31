import {  Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function AppSideBar() {

	const navigate = useNavigate();

	return (
		<aside className="w-(--app-sidebar-width) h-full border-r flex flex-col">
			<nav>
				<ul>
					<li>
						<Link to="/chat/$id" params={{id: "1"}} className="block p-4 hover:bg-gray-200">New Chat</Link>
					</li>
				</ul>
			</nav>
			<div className="w-full mt-auto p-2 pb-4 border-t">
				<Button className="w-full cursor-pointer" onClick={() => navigate({ to: "/"})}>
					New Chat
				</Button>
			</div>
		</aside>
	);
}