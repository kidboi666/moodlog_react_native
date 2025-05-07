import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export class AuthService {
  static async checkPremiumStatus(): Promise<boolean> {
    return Promise.resolve(false)
  }

  static async signInAnonymously(draftUserName: string) {
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
  }

  static onAuthStateChange(
    setSession: (session: Session | null) => void,
    clearSession: () => void,
  ) {
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
  }
}
