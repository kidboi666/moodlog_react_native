import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Button, Separator, XStack, YStack, styled } from 'tamagui'

import {
  BaseText,
  Delay,
  FormInput,
  H1,
  H3,
  PressableButton,
  ViewContainer,
} from '@/components/shared'
import { GoogleIcon } from '@/components/shared/GoogleIcon'
import { DelayMS } from '@/constants'
import { supabase } from '@/lib/supabase'
import { useAuth, useStepProgress } from '@/store'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export default function LoginScreen() {
  const { draftUserName } = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToPrevStep,
  } = useStepProgress()
  const setSession = useAuth(state => state.setSession)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const isCurrentPage = currentStep === 4
  const {} = useUp
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  })

  const handlePrevStep = () => {
    if (isCurrentPage) {
      goToPrevStep()
      router.push('/nickname')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)

      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        })
        if (error) throw error

        if (data?.session) {
          setSession(data.session)
          await
        }

        router.replace('/(tabs)')
      } else {
        throw new Error('No idToken')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(
        err instanceof Error
          ? err
          : new Error('로그인 중 오류가 발생했습니다.'),
      )
      Alert.alert(
        '로그인 오류',
        '로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    // 익명 로그인하여 바로 메인 페이지로 이동
    handleGoogleLogin()
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>시작할 준비가 되었어요!</H1>
          <H3 color='$gray11' mt='$4'>
            무드로그를 사용하기 위한 계정을 선택해주세요.
          </H3>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <YStack gap='$6' mt='$4'>
            <GoogleButton
              onPress={handleGoogleLogin}
              disabled={isLoading}
              icon={<GoogleIcon />}
            >
              <ButtonText>{t('auth.signInWithGoogle')}</ButtonText>
            </GoogleButton>

            <OrContainer>
              <Separator />
              <OrText>{t('auth.or')}</OrText>
              <Separator />
            </OrContainer>

            <YStack gap='$4'>
              <PressableButton
                bg='$color12'
                color='white'
                onPress={handleSkip}
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : '게스트로 시작하기'}
              </PressableButton>

              <BaseText color='$gray11' text='center' fontSize='$3'>
                게스트로 시작해도 나중에 언제든지 계정을 연결할 수 있어요.
              </BaseText>
            </YStack>

            {error && (
              <BaseText color='$red9' text='center'>
                {error.message}
              </BaseText>
            )}
          </YStack>
        </Delay>
      </YStack>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <XStack>
          <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
            <BaseText>이전</BaseText>
          </PressableButton>
        </XStack>
      </Delay>
    </ViewContainer>
  )
}

// 스타일 컴포넌트
const GoogleButton = styled(Button, {
  height: 48,
  bg: 'white',
  borderWidth: 1,
  borderColor: '$gray6',
  flexDirection: 'row',
  items: 'center',
  justify: 'center',
  gap: '$2',
})

const ButtonText = styled(BaseText, {
  color: '$gray12',
  fontWeight: 'bold',
})

const OrContainer = styled(XStack, {
  items: 'center',
  gap: '$2',
})

const OrText = styled(BaseText, {
  color: '$gray10',
  fontSize: '$3',
  px: '$2',
})
