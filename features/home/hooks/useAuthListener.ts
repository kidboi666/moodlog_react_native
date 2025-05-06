import { useEffect } from 'react'

import { AuthService } from '@/shared/services'
import { useAuth } from '@/shared/store'

export const useAuthListener = () => {
  const setSession = useAuth(state => state.setSession)
  const clearSession = useAuth(state => state.clearSession)

  useEffect(() => {
    const subscription = AuthService.onAuthStateChange(setSession, clearSession)
    return () => subscription.unsubscribe()
  }, [setSession, clearSession])
}
