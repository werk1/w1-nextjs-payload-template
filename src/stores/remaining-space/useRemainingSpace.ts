// 'use client'

// import { useBoundStore } from '../boundStore'
// import { useEffect } from 'react'

// export const useRemainingSpace = () => {
//   const { remainingSpace, updateRemainingSpace } = useBoundStore()

//   useEffect(() => {
//     updateRemainingSpace()
    
//     let resizeTimer: NodeJS.Timeout
//     const handleResize = () => {
//       clearTimeout(resizeTimer)
//       resizeTimer = setTimeout(updateRemainingSpace, 100)
//     }

//     window.addEventListener('resize', handleResize)
//     return () => {
//       window.removeEventListener('resize', handleResize)
//       clearTimeout(resizeTimer)
//     }
//   }, [updateRemainingSpace])

//   return remainingSpace.value
// }


'use client'

import { useBoundStore } from '../boundStore'
import { useEffect, useCallback } from 'react'

export const useRemainingSpace = () => {
  const { remainingSpace, updateRemainingSpace } = useBoundStore()

  const handleResize = useCallback(() => {
    requestAnimationFrame(updateRemainingSpace)
  }, [updateRemainingSpace])

  useEffect(() => {
    // Initial update
    updateRemainingSpace()
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return remainingSpace.value
}