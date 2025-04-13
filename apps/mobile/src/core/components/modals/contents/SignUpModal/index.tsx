import { SERVER_ERROR } from '@/core/constants/error'
import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { HTTP_STATUS } from '@/core/constants/status'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { isValidEmail } from '@/utils/common'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import {
  Button,
  H1,
  Input,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui'
import { BottomSheetContainer } from '../../BottomSheetContainer'

export const SignUpModal = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { hideBottomSheet, showBottomSheet } = useBottomSheet()
  const { signup, isLoading, error, isAuthenticated } = useAuth()
  const router = useRouter()

  const goLoginPage = () => {
    showBottomSheet(BottomSheetType.SIGN_IN, AUTH_SNAP_POINTS)
  }

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('모든 필드를 입력해주세요.')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('비밀번호가 일치하지 않습니다.')
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

    await signup(email, password)
  }

  useEffect(() => {
    if (error && !isLoading) {
      if (error.status === HTTP_STATUS.CONFLICT) {
        Alert.alert(
          SERVER_ERROR.EMAIL_CONFLICT,
          '로그인 페이지로 이동하시겠습니까?',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '로그인',
              onPress: goLoginPage,
            },
          ],
        )
      } else {
        Alert.alert('회원가입에 실패했습니다.', error.message)
      }
    }

    if (isAuthenticated) {
      hideBottomSheet()
      router.replace('/(tabs)')
    }
  }, [error, isAuthenticated, isLoading, hideBottomSheet, router])

  return (
    <BottomSheetContainer>
      <YStack gap='$4' width='100%'>
        <H1>{t('auth.register')}</H1>
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
          <Input
            placeholder={t('auth.confirmPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete='password'
          />
          <Button themeInverse onPress={handleSignUp} disabled={isLoading}>
            {isLoading ? <Spinner /> : t('auth.registerButton')}
          </Button>
        </YStack>

        <Separator />

        <XStack items='center' justify='center' gap='$2'>
          <Text>{t('auth.hasAccount')}</Text>
          <Text color='$blue10' onPress={goLoginPage}>
            {t('common.login')}
          </Text>
        </XStack>
      </YStack>
    </BottomSheetContainer>
  )
}
