import { supabase } from '@/lib/supabase'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Session } from '@supabase/supabase-js'

import { UpdateUserInfoParams } from '@/types'

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('user_id', userId)
    .single()
  if (error) throw error
  return data
}

export async function updateUserInfo({
  userId,
  userName,
  age,
  avatarUrl,
}: UpdateUserInfoParams) {
  const { error } = await supabase
    .from('profiles')
    .update({
      user_name: userName,
      age,
      avatar_url: avatarUrl,
    })
    .eq('user_id', userId)
  if (error) throw error
}

export async function signInGoogle() {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  })
  await GoogleSignin.hasPlayServices()
  const userInfo = await GoogleSignin.signIn()
  if (!userInfo.data?.idToken) throw new Error('No idToken')
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: userInfo.data.idToken,
  })
  if (error) throw error
  return data
}

export function onAuthStateChange(
  setSession: (session: Session | null) => void,
  clearSession: () => void,
) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      clearSession()
    } else if (session) {
      setSession(session)
    }
  })
  return subscription
}
