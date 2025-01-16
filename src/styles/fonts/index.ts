import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

// If loading a variable font, you don't need to specify the font weight
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

//Local Fonts
export const GTAmericaStandardRegular = localFont({
  src: [
    {
      path: './GTAmerica/GT-America-Standard-Regular.woff2',
      weight: 'normal',
    },
  ],
  variable: '--fontGtAmericaStandardRegular',
})

export const GTAmericaStandardBold = localFont({
  src: [
    {
      path: './GTAmerica/GT-America-Standard-Bold.woff2',
      weight: 'normal',
    },
  ],
  variable: '--fontGtAmericaStandardBold',
})

export const GTAmericaStandardThin = localFont({
  src: [
    {
      path: './GTAmerica/GT-America-Standard-Thin.woff2',
      weight: 'normal',
    },
  ],
  variable: '--fontGtAmericaStandardThin',
})

export const GTAmericaStandardBlack = localFont({
  src: [
    {
      path: './GTAmerica/GT-America-Standard-Black.woff2',
      weight: 'normal',
    },
  ],
  variable: '--fontGtAmericaStandardBlack',
})

// Group all font variables in one place
export const installedLocalFonts = [
  GTAmericaStandardBlack.variable,
  GTAmericaStandardRegular.variable,
  GTAmericaStandardBold.variable,
  GTAmericaStandardThin.variable,
]
export const installedGoogleFonts = [inter.className]
export const installedFonts = [...installedLocalFonts, ...installedGoogleFonts].join(' ')

