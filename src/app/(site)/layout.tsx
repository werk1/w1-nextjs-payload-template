export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="de"
		>
			<body>
				<div>
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
