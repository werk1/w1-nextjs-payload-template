'use client'

import { useBoundStore } from '@/stores/boundStore'

const FillBottomSpace = () => {
  const remainingSpace = useBoundStore((state) => state.remainingSpace.value)

  const styles = {
    container: {
      height: remainingSpace,
      backgroundColor: "var(--col_background-dark)",
    } as React.CSSProperties
  }
  return <div style={styles.container}></div>
}

export default FillBottomSpace
