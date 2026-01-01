


export default function AppMain({
	children,
}: {
	children?: React.ReactNode;
}) {
	return (
		<main className="flex h-[calc(100vh - var(--app-header-height))] w-(--app-chat-width)">
			{children}
		</main>
	);
}