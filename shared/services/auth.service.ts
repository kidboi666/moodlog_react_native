import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export const AuthService = {
  checkPremiumStatus: async () => {
    return Promise.resolve(false)
  },

  signInAnonymously: async (draftUserName: string) => {
    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        data: { user_name: draftUserName },
      },
    })

    if (error) {
      console.error('Failed to sign in :', error)
      throw error
    }

    return data
  },

  onAuthStateChange: (
    setSession: (session: Session | null) => void,
    clearSession: () => void,
  ) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        clearSession()
      } else if (session) {
        console.log('session', session.user.id)
        setSession(session)
      }
    })

    return subscription
  },
}
