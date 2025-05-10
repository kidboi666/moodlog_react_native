import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Separator, XStack, YStack } from 'tamagui'

import {
  BaseText,
  FormInput,
  H1,
  H3,
  PressableButton,
} from '@/components/shared'
import { Layout } from '@/constants'
import { useAuth, useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { CommonUtils } from '@/utils'
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

    if (!CommonUtils.isValidEmail(email)) {
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
      <YStack gap='$4'>
        <FormInput
          placeholder={t('auth.email')}
          value={email}
          onChangeText={value => updateFormField('email', value)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
        />
        <FormInput
          placeholder={t('auth.password')}
          value={password}
          onChangeText={value => updateFormField('password', value)}
          secureTextEntry
          autoComplete='password'
        />
        <PressableButton
          themeInverse
          onPress={handleSignIn}
          disabled={isDisabled}
          loading={isLoading}
        >
          {t('auth.login')}
        </PressableButton>
      </YStack>
      <Separator />
      <XStack items='center' justify='center' gap='$2'>
        <BaseText>{t('auth.noAccount')}</BaseText>
        <PressableButton
          bg='transparent'
          color='$blue10'
          onPress={navigateToRegister}
        >
          {t('auth.signup')}
        </PressableButton>
      </XStack>
    </BottomSheetContainer>
  )
}

export const SignInModal = memo(_SignInModal)

SignInModal.displayName = 'SignInModal'
