import { ScrollTracker } from '@/stores/scroll-observer'
import './global.css' // Global styles

import { GTAmericaStandardRegular, GTAmericaStandardBold, GTAmericaStandardThin } from '@/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`
      ${GTAmericaStandardRegular.variable} 
      ${GTAmericaStandardBold.variable}
      ${GTAmericaStandardThin.variable}
    `}
    >
    <ScrollTracker/>
      <body>
          {children}
      </body>
    </html>
  )
}
