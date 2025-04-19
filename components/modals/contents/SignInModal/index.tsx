import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Separator, Spinner } from 'tamagui'

import { AUTH_SNAP_POINTS } from '@/constants'
import { useAuth, useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { isValidEmail } from '@/utils'
import { AuthError } from '@supabase/supabase-js'

import { BaseText } from '@/components/shared/BaseText'
import { FormInput } from '@/components/shared/FormInput'
import { H1, H3 } from '@/components/shared/Heading'

import { PressableButton } from '@/components/shared/PressableButton'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SingInModal.styled'

export const SignInModal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { setSession, setUserName } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(t('validation.allFieldsRequired'))
      return
    }

    if (password.length < 8) {
      Alert.alert(t('validation.passwordMustBeAtLeast8Characters'))
      return
    }

    if (!isValidEmail(email)) {
      Alert.alert(t('validation.invalidEmailFormat'))
      return
    }

    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (data.session) {
      setSession(data.session)
      if (data.session.user.user_metadata.user_name) {
        setUserName(data.session.user.user_metadata.user_name)
      }
    }

    setIsAuthenticated(true)
    setIsLoading(false)
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
  }, [error, isAuthenticated, isLoading, hideBottomSheet, router, t])

  return (
    <BottomSheetContainer>
      <H1>{t('auth.login')}</H1>
      <H3>{t('auth.loginDescription')}</H3>
      <S.SignInSection>
        <FormInput
          placeholder={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
        />
        <FormInput
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
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
