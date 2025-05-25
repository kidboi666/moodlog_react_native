import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'

import { Delay, GoogleIcon, H1, H3, ScreenView } from '@/components/shared'
import { DelayMS } from '@/constants'
import {
  useSignInAnonymously,
  useSignInGoogle,
  useUpdateUserInfo,
} from '@/queries'
import { useStepProgress } from '@/store'
import { toSingle } from '@/utils'

export default function LoginScreen() {
  const { draftUserName } = useLocalSearchParams()
  const theme = useTheme()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const {
    mutateAsync: signInGoogle,
    isPending: isPendingGoogle,
    error: googleError,
  } = useSignInGoogle()
  const {
    mutate: signInAnonymously,
    isPending: isPendingAnon,
    error: anonError,
  } = useSignInAnonymously()
  const { mutate: updateUserInfo } = useUpdateUserInfo()

  const handleGoogleLogin = async () => {
    const data = await signInGoogle()
    updateUserInfo({ userId: data.user.id, userName: toSingle(draftUserName) })
  }

  const handleAnonLogin = () => {
    signInAnonymously(toSingle(draftUserName))
  }

  useFocusEffect(
    useCallback(() => {
      setStep(2)
    }, []),
  )
  const isPending = isPendingGoogle || isPendingAnon
  const error = googleError || anonError

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]} style={styles.header}>
          <H1>시작할 준비가 되었어요!</H1>
          <H3 style={{ color: theme.colors.secondary }}>
            무드로그를 사용하기 위한 계정을 선택해주세요.
          </H3>
        </Delay>
      </View>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[1]} style={styles.submitBox}>
        {error && (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error.message}
          </Text>
        )}
        <Button
          mode='contained'
          onPress={handleGoogleLogin}
          disabled={isPending}
          loading={isPending}
          icon={GoogleIcon}
        >
          {t('auth.signInWithGoogle')}
        </Button>
        <Button
          mode='text'
          onPress={handleAnonLogin}
          disabled={isPending}
          loading={isPending}
        >
          가입없이 시작하기
        </Button>
      </Delay>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  header: {
    gap: 24,
  },
  googleButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  error: {
    textAlign: 'center',
  },
  submitBox: {
    gap: 12,
  },
  button: {
    alignSelf: 'flex-start',
  },
})
