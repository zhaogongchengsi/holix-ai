import {  Link } from "@tanstack/react-router";

export default function AppSideBar() {
	return (
		<aside className="w-(--app-sidebar-width) h-full border-r">
			<nav>
				<ul>
					<li>
						<Link to="/chat/$id" params={{id: "1"}} className="block p-4 hover:bg-gray-200">New Chat</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}