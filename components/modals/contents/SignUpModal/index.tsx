import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Separator, Spinner } from 'tamagui'

import { AUTH_SNAP_POINTS, HTTP_STATUS } from '@/constants'
import { useBottomSheet } from '@/store'
import { BottomSheetType } from '@/types'
import { isValidEmail } from '@/utils'

import { BaseText } from '@/components/shared/BaseText'
import { FormInput } from '@/components/shared/FormInput'
import { H1 } from '@/components/shared/Heading'
import { PressableButton } from '@/components/shared/PressableButton'
import { supabase } from '@/lib/supabase'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SignUpModal.styled'

export const SignUpModal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { hideBottomSheet, showBottomSheet } = useBottomSheet()

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

    setIsLoading(true)

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: userName,
        },
      },
    })

    if (error) {
      console.error(error)
      if (error?.status === HTTP_STATUS.CONFLICT) {
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
      setIsLoading(false)
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      hideBottomSheet()
      router.replace('/(tabs)')
    }
  }, [isAuthenticated, hideBottomSheet, router])

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
        <FormInput
          placeholder={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
        />
        <FormInput
          placeholder={t('auth.username')}
          value={userName}
          onChangeText={setUserName}
          autoCapitalize='none'
          autoComplete='username'
        />
        <FormInput
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete='password'
        />
        <FormInput
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
          {isLoading ? <Spinner /> : <BaseText>{t('auth.register')}</BaseText>}
        </S.SignUpButton>
      </S.SignUpSection>

      <Separator />

      <S.SignInSection>
        <BaseText>{t('auth.hasAccount')}</BaseText>
        <PressableButton bg='transparent' color='$blue10' onPress={goLoginPage}>
          {t('auth.login')}
        </PressableButton>
      </S.SignInSection>
    </BottomSheetContainer>
  )
}
