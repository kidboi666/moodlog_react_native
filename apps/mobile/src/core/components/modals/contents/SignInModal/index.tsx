import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { isValidEmail } from '@/utils/common'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { H1, H3, Input, Separator, Spinner, Text, YStack } from 'tamagui'
import { BottomSheetContainer } from '../../BottomSheetContainer'
import * as S from './SingInModal.styled'

export const SignInModal = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { login, isLoading, error, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('모든 필드를 입력해주세요.')
      return
    }

    if (password.length < 8) {
      Alert.alert('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    if (!isValidEmail(email)) {
      Alert.alert('이메일 형식이 올바르지 않습니다.')
      return
    }

    await login(email, password)
  }

  const navigateToRegister = () => {
    showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS)
  }

  useEffect(() => {
    if (error && !isLoading) {
      Alert.alert('로그인 실패', error)
      useAuth.setState({ error: null })
    }

    if (isAuthenticated) {
      hideBottomSheet()
      router.replace('/(tabs)')
    }
  }, [error, isAuthenticated, isLoading, hideBottomSheet, router])

  return (
    <BottomSheetContainer>
      <H1>{t('auth.login')}</H1>
      <H3>{t('auth.loginDescription')}</H3>
      <YStack gap='$4'>
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
        <S.SignInButton
          onPress={handleLogin}
          disabled={isLoading || !email || !password}
        >
          {isLoading ? () => <Spinner /> : t('auth.loginButton')}
        </S.SignInButton>
      </YStack>

      <Separator />

      <S.SignUpSection>
        <Text>{t('auth.noAccount')}</Text>
        <S.SignUpButton onPress={navigateToRegister}>
          {t('common.join')}
        </S.SignUpButton>
      </S.SignUpSection>
    </BottomSheetContainer>
  )
}
