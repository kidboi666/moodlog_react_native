import { type ReactNode, useEffect, useState } from 'react'

export const useAnimatedEntry = (
  delay: number,
  item: ReactNode,
): { isVisible: boolean; item: ReactNode } => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const time = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => {
      clearTimeout(time)
    }
  }, [])

  return {
    isVisible,
    item,
  }
}
