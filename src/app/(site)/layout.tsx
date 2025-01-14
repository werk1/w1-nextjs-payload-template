export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-wrapper">
      <main>{children}</main>
    </div>
  )
}
