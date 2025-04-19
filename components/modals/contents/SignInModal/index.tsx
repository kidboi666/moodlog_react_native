import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Separator, Spinner } from 'tamagui'

import { AUTH_SNAP_POINTS } from '@/constants'
import { useAuth, useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { isValidEmail } from '@/utils'

import { BaseText } from '@/components/shared/BaseText'
import { FormInput } from '@/components/shared/FormInput'
import { H1, H3 } from '@/components/shared/Heading'
import { PressableButton } from '@/components/shared/PressableButton'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SingInModal.styled'

interface LoginFormState {
  email: string
  password: string
}

interface LoginStatus {
  isLoading: boolean
  error: AuthError | null
  isAuthenticated: boolean
}

export const SignInModal = () => {
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
    showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS)
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

  return (
    <BottomSheetContainer>
      <H1>{t('auth.login')}</H1>
      <H3>{t('auth.loginDescription')}</H3>
      <S.SignInSection>
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
          disabled={isLoading || !email || !password}
        >
          {isLoading ? <Spinner /> : t('auth.login')}
        </PressableButton>
      </S.SignInSection>
      <Separator />
      <S.SignUpSection>
        <BaseText>{t('auth.noAccount')}</BaseText>
        <PressableButton
          bg='transparent'
          color='$blue10'
          onPress={navigateToRegister}
        >
          {t('auth.signup')}
        </PressableButton>
      </S.SignUpSection>
    </BottomSheetContainer>
  )
}
