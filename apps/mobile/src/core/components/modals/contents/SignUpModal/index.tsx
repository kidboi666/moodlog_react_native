import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Input, Separator, Spinner } from 'tamagui'

import { BaseText } from '@/core/components/shared/BaseText'
import { H1 } from '@/core/components/shared/Heading'
import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { HTTP_STATUS } from '@/core/constants/status'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { isValidEmail } from '@/utils/common'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SignUpModal.styled'

export const SignUpModal = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { hideBottomSheet, showBottomSheet } = useBottomSheet()
  const { signup, isLoading, error, isAuthenticated, userInfo } = useAuth()
  const router = useRouter()

  const goLoginPage = () => {
    showBottomSheet(BottomSheetType.SIGN_IN, AUTH_SNAP_POINTS)
  }

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t('validation.allFieldsRequired'))
      return
    }

    if (password !== confirmPassword) {
      Alert.alert(t('validation.passwordMismatch'))
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

    await signup(email, password, email.split('@')[0])
  }

  useEffect(() => {
    if (error && !isLoading) {
      if (error?.response?.status === HTTP_STATUS.CONFLICT) {
        Alert.alert(
          t('serverError.emailConflict.title'),
          t('serverError.emailConflict.description'),
          [
            {
              text: t('common.cancel'),
              style: 'cancel',
            },
            {
              text: t('common.login'),
              onPress: goLoginPage,
            },
          ],
        )
      } else {
        Alert.alert(
          t('serverError.userRegistrationFailed'),
          t('auth.registerFailed'),
        )
      }
    }

    if (isAuthenticated) {
      hideBottomSheet()
      router.replace('/(tabs)')
    }
  }, [
    error,
    isAuthenticated,
    isLoading,
    hideBottomSheet,
    router,
    t,
    goLoginPage,
  ])

  const isDisabled =
    isLoading ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword

  return (
    <BottomSheetContainer>
      <H1>{t('auth.register')}</H1>
      <S.SignUpSection>
        <Input
          placeholder={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
        />
        <Input
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete='password'
        />
        <Input
          placeholder={t('auth.confirmPassword')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete='password'
        />
        <S.SignUpButton
          themeInverse
          onPress={handleSignUp}
          disabled={isDisabled}
        >
          {isLoading ? <Spinner /> : t('auth.registerButton')}
        </S.SignUpButton>
      </S.SignUpSection>

      <Separator />

      <S.SignInSection>
        <BaseText>{t('auth.hasAccount')}</BaseText>
        <S.SignInButton onPress={goLoginPage}>
          {t('common.login')}
        </S.SignInButton>
      </S.SignInSection>
    </BottomSheetContainer>
  )
}
