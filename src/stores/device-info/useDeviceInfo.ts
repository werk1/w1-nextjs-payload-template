'use client'

import { useBoundStore } from '../boundStore'
import { useEffect } from 'react'

export const useDeviceInfo = () => {
  const { device, updateDeviceInfo } = useBoundStore()

  useEffect(() => {
    // Initial update
    updateDeviceInfo()

    // Add event listeners
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
    }
  }, [updateDeviceInfo])

  return device
}