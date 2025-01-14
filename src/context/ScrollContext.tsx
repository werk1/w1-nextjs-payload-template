import { createContext } from 'react'
import { ScrollType, useScroll } from '../hooks/useScroll'

/**
 * ScrollContext provides a way to share scroll state between components.
 * It uses the [useScrollObserver](../hooks/useScrollObserver.tsx) hook to store the current scroll position and
 * direction.
 */
const ScrollContext = createContext<ScrollType | null>(null)

interface ScrollProviderProps {
  children: React.ReactNode
}

/**
 * A context provider for the scroll position and direction of the window.
 * Listens to the window's scroll event and updates the context with the current
 * scroll position and whether the user is scrolling down.
 *
 * @param {Object} props The props object.
 * @param {React.ReactNode} props.children The children elements.
 * @returns {JSX.Element} The context provider element.
 */
const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const { scrollY, scrollYClamped, maxScrollY, maxScrollYClamped } = useScroll()

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrollYClamped,
        maxScrollY,
        maxScrollYClamped,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export { ScrollProvider, ScrollContext }
