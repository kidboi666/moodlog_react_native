import { DELAY_MS } from '@/src/shared/constants'
import { useEffect, useState } from 'react'

export function useFirstRender() {
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false)
    }, DELAY_MS.ANIMATION.MEDIUM * 4)

    return () => clearTimeout(timeout)
  }, [])

  return { firstRender }
}
