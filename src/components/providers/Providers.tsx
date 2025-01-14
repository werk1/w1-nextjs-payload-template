'use client'

import { DeviceProvider } from '@/context/DeviceContext'
import { ScrollProvider } from '@/context/ScrollContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DeviceProvider>
      <ScrollProvider>
        <>{children}</>
      </ScrollProvider>
    </DeviceProvider>
  )
}
