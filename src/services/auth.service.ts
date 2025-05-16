import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export async function checkPremiumStatus(): Promise<boolean> {
  return Promise.resolve(false)
}

export async function signInAnonymously(draftUserName: string) {
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

export async function upsertUserInfo() {}

export async function signInGoogle(draftUserName: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}

export function onAuthStateChange(
  setSession: (session: Session | null) => void,
  clearSession: () => void,
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    console.log('session', session)
    if (event === 'SIGNED_OUT') {
      clearSession()
    } else if (session) {
      console.log('session', session.user.id)
      setSession(session)
    }
  })
  return subscription
}
