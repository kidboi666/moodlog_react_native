import { useEffect } from 'react'

import { onAuthStateChange } from '@/services'
import { useAuth } from '@/store'

export const useAuthListener = () => {
  const setSession = useAuth(state => state.setSession)
  const clearSession = useAuth(state => state.clearSession)

  useEffect(() => {
    const subscription = onAuthStateChange(setSession, clearSession)
    return () => subscription.unsubscribe()
  }, [setSession, clearSession])
}
