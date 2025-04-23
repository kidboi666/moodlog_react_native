import { SupabaseClient } from '@supabase/supabase-js'

export const AuthService = {
  checkPremiumStatus: async () => {
    return Promise.resolve(false)
  },

  signInAnonymously: async (
    supabase: SupabaseClient,
    draftUserName: string,
  ) => {
    try {
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
    } catch (err) {
      console.error('Failed to sign in anonymously :', err)
      throw err
    }
  },
}
