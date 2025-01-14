import localFont from 'next/font/local'

export const yourFont = localFont({
  src: [
    {
      path: './local/YourFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './local/YourFont-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './local/YourFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-your-font', // CSS variable name
})
