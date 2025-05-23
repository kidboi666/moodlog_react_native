import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Button, FormInput, GoogleIcon, H1, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { useAuth, useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { isValidEmail } from '@/utils'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { BottomSheetContainer } from '../../BottomSheetContainer'

interface LoginFormState {
  email: string
  password: string
}

interface LoginStatus {
  isLoading: boolean
  error: AuthError | null
  isAuthenticated: boolean
}

function _SignInModal() {
  const { t } = useTranslation()
  const router = useRouter()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { setSession, setUserName } = useAuth()

  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  })
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({
    isLoading: false,
    error: null,
    isAuthenticated: false,
  })

  const { email, password } = formState
  const { isLoading, error, isAuthenticated } = loginStatus

  const updateFormField = (field: keyof LoginFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!email || !password) {
      Alert.alert(t('validation.allFieldsRequired'))
      return false
    }

    if (password.length < 8) {
      Alert.alert(t('validation.passwordMustBeAtLeast8Characters'))
      return false
    }

    if (!isValidEmail(email)) {
      Alert.alert(t('validation.invalidEmailFormat'))
      return false
    }

    return true
  }

  const handleSignIn = async () => {
    if (!validateForm()) return

    setLoginStatus(prev => ({ ...prev, isLoading: true }))

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setLoginStatus(prev => ({ ...prev, error, isLoading: false }))
      return
    }

    if (data.session) {
      setSession(data.session)
      if (data.session.user.user_metadata.user_name) {
        setUserName(data.session.user.user_metadata.user_name)
      }
    }

    setLoginStatus(prev => ({
      ...prev,
      isAuthenticated: true,
      isLoading: false,
    }))
  }

  const navigateToRegister = () => {
    showBottomSheet(BottomSheetType.SIGN_UP, Layout.SNAP_POINTS.AUTH)
  }

  useEffect(() => {
    if (error && !isLoading) {
      Alert.alert(t('serverError.signinFailed'), t('auth.loginFailed'))
    }

    if (isAuthenticated) {
      hideBottomSheet()
      router.replace('/(tabs)')
    }
  }, [error, isAuthenticated, isLoading, t, hideBottomSheet, router])

  const isDisabled = !email || !password
  return (
    <BottomSheetContainer>
      <H1>{t('auth.login')}</H1>
      <H3>{t('auth.loginDescription')}</H3>
      <View style={styles.contentBox}>
        <Button
          icon={GoogleIcon}
          onPress={handleSignIn}
          disabled={isDisabled}
          loading={isLoading}
        >
          {t('auth.login')}
        </Button>
      </View>
      <View style={styles.buttonBox}>
        <Text>{t('auth.noAccount')}</Text>
        <Button mode='text' onPress={navigateToRegister}>
          {t('auth.signup')}
        </Button>
      </View>
    </BottomSheetContainer>
  )
}

const styles = StyleSheet.create({
  contentBox: {
    gap: 16,
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
})

export const SignInModal = memo(_SignInModal)

SignInModal.displayName = 'SignInModal'
