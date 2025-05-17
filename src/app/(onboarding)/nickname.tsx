import { supabase } from '@/lib'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import {
  BaseText,
  Delay,
  FormInput,
  H2,
  H3,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { signInAnonymously } from '@/services'
import { useStepProgress } from '@/store'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToPrevStep,
    goToNextStep,
  } = useStepProgress()
  const [draftUserName, setDraftUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | Error | null>(null)
  const isNicknamePage = currentStep === 1
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  })

  const handleDraftUserNameChange = (text: string) => {
    setDraftUserName(text)
  }

  const handlePrevStep = () => {
    if (isNicknamePage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleNextStep = async () => {
    if (isNicknamePage && draftUserName) {
      setIsLoading(true)
      setError(null)

      try {
        const session = await signInAnonymously(draftUserName)
        goToNextStep()
        router.push('/benefit')
      } catch (err) {
        console.error('Failed to sign in :', err)
        if (err instanceof AuthError) {
          setError(err)
        }
        if (err instanceof Error) {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        })

        if (error) {
          throw new Error('Failed to signin', error)
        }
      } else {
        throw new Error('No idToken')
      }
      goToNextStep()
      router.push('/benefit')
    } catch (err) {
      console.error('Failed to sign in :', err)
    }
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.LONG[0]}>
          <H2>{t('onboarding.nickname.title')}</H2>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.LONG[1]}>
          <H3 color='$gray11'>{t('onboarding.nickname.description')}</H3>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.LONG[2]}>
          <FormInput
            value={draftUserName}
            onChangeText={handleDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
          {error && <BaseText color='$red9'>{error.message}</BaseText>}
        </Delay>
      </YStack>
      <Delay delay={DelayMS.ANIMATION.LONG[3]}>
        <XStack justify='space-between'>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={handleSubmit}
          />
        </XStack>
      </Delay>
    </ViewContainer>
  )
}
