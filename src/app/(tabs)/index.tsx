import { useAuth } from '@/store'
import { Redirect } from 'expo-router'
import React from 'react'

export default function MainScreen() {
  const session = useAuth(state => state.session)

  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }
  return <Redirect href='/(tabs)/home' />
}
