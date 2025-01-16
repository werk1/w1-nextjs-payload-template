export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<main>{children}</main>
		</div>
	);
}
