import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
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
import { TFunction } from 'i18next'
import Animated, { FadeIn } from 'react-native-reanimated'

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
  const error = googleError || anonError

  return (
    <ScreenView edges={['bottom']}>
      <Animated.View
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG[0])}
        style={styles.header}
      >
        <H1>시작할 준비가 되었어요!</H1>
        <H3 style={{ color: theme.colors.secondary }}>
          무드로그를 사용하기 위한 계정을 선택해주세요.
        </H3>
      </Animated.View>
      <Animated.View
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG[1])}
        style={styles.submitBox}
      >
        {error && (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error.message}
          </Text>
        )}
        <Button
          onPress={handleAnonLogin}
          disabled={isPendingGoogle || isPendingAnon}
          loading={isPendingAnon}
        >
          {t('common.anon')}
        </Button>
        <Button
          mode='contained'
          onPress={handleGoogleLogin}
          disabled={isPendingGoogle || isPendingAnon}
          loading={isPendingGoogle}
          icon={GoogleIcon}
        >
          {t('auth.signInWithGoogle')}
        </Button>
      </Animated.View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  header: {
    gap: 24,
  },
  googleButtonInner: {
    gap: 12,
  },
  error: {
    textAlign: 'center',
  },
  submitBox: {
    gap: 12,
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-start',
  },
})
