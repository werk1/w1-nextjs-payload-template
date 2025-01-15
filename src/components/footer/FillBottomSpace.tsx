'use client'

import { useBoundStore } from '@/stores/boundStore'

const FillBottomSpace = () => {
  const remainingSpace = useBoundStore((state) => state.remainingSpace.value)

  const styles = {
    container: {
      height: remainingSpace,
      backgroundColor: "var(--col_background-dark)",
      } as React.CSSProperties
      // backgroundColor: 'rgba(200,1.0,0,0.5)' 
  }
  return <div style={styles.container}></div>
}

export default FillBottomSpace
