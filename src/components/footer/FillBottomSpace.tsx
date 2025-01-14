import React from 'react'

interface FillBottomSpaceProps {
  height: number
  children?: React.ReactNode
}

const FillBottomSpace = (props: FillBottomSpaceProps) => {
  const styles = {
    container: {
      height: props.height,
      //     backgroundColor: "var(--col_background-dark)",
      // } as React.CSSProperties,
      backgroundColor: 'rgba(200,1.0,0,0.5)',
    },
  }
  return <div style={styles.container}></div>
}

export default FillBottomSpace
