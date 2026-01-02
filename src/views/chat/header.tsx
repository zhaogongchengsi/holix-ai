import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AsideChatHeader() {
	return (
		<header className="pr-2 pl-4 py-4 flex justify-between items-center">
			<h2 className="font-bold text-lg">Chats</h2>

			<Button variant="outline" size="icon">
				<Search className="size-4" />
			</Button>
		</header>
	);
}
