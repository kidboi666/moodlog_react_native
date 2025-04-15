import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Input, Separator, Spinner } from 'tamagui'

import { BaseText } from '@/core/components/shared/BaseText'
import { FormInput } from '@/core/components/shared/FormInput'
import { H1, H3 } from '@/core/components/shared/Heading'
import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { isValidEmail } from '@/utils/common'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SingInModal.styled'

export const SignInModal = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const signin = useAuth(state => state.signin)
  const isLoading = useAuth(state => state.isLoading)
  const error = useAuth(state => state.error)
  const isAuthenticated = useAuth(state => state.isAuthenticated)
  const router = useRouter()

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

    await signin(email, password)
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
    return () => {
      useAuth.setState({ error: null })
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
        <S.SignInButton
          onPress={handleSignIn}
          disabled={isLoading || !email || !password}
        >
          {isLoading ? () => <Spinner /> : t('auth.loginButton')}
        </S.SignInButton>
      </S.SignInSection>

      <Separator />

      <S.SignUpSection>
        <BaseText>{t('auth.noAccount')}</BaseText>
        <S.SignUpButton onPress={navigateToRegister}>
          {t('common.join')}
        </S.SignUpButton>
      </S.SignUpSection>
    </BottomSheetContainer>
  )
}
