import localFont from 'next/font/local'

export const GTAmericaStandardRegular = localFont({
  src: [
    {
      path: '../fonts/GTAmerica/GT-America-Standard-Regular.woff2',
      weight: 'normal',
    },
  ],
  variable: '--font-gt-america-standard-regular',
})

export const GTAmericaStandardBold = localFont({
  src: [
    {
      path: '../fonts/GTAmerica/GT-America-Standard-Bold.woff2',
      weight: 'normal',
    },
  ],
  variable: '--font-gt-america-standard-bold',
})

export const GTAmericaStandardThin = localFont({
  src: [
    {
      path: '../fonts/GTAmerica/GT-America-Standard-Thin.woff2',
      weight: 'normal',
    },
  ],
  variable: '--font-gt-america-standard-thin',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GTAmericaStandardRegular.variable}
      ${GTAmericaStandardBold.variable}
      ${GTAmericaStandardThin.variable}`}
    >
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
