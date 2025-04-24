import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { H2, H3, XStack, YStack } from 'tamagui'

import { useStepProgress } from '@/store'
import { ANIMATION_DELAY_MS_LONG } from 'shared/constants'

import {
  AnimatedEntry,
  BaseText,
  FormInput,
  PressableButton,
  ViewContainer,
} from '@/shared/components'
import { AuthError } from '@supabase/supabase-js'
import { AuthService } from 'shared/services'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const isNicknamePage = currentStep === 1
  const [draftUserName, setDraftUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | Error | null>(null)

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
        await AuthService.signInAnonymously(supabase, draftUserName)
        goToNextStep()
        router.push('/benefit')
      } catch (err) {
        console.error('Failed to sign in anonymously :', err)

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

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <AnimatedEntry delay={ANIMATION_DELAY_MS_LONG[0]}>
          <H2>{t('onboarding.nickname.title')}</H2>
        </AnimatedEntry>
        <AnimatedEntry delay={ANIMATION_DELAY_MS_LONG[1]}>
          <H3 color='$gray11'>{t('onboarding.nickname.description')}</H3>
        </AnimatedEntry>
        <AnimatedEntry delay={ANIMATION_DELAY_MS_LONG[2]}>
          <FormInput
            value={draftUserName}
            onChangeText={handleDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
          {error && <BaseText color='$red9'>{error}</BaseText>}
        </AnimatedEntry>
      </YStack>
      <AnimatedEntry delay={ANIMATION_DELAY_MS_LONG[3]}>
        <XStack justify='space-between'>
          <PressableButton
            icon={ArrowLeft}
            onPress={handlePrevStep}
            disabled={isLoading}
          >
            {t('common.prev')}
          </PressableButton>
          <PressableButton
            disabled={!draftUserName || isLoading}
            onPress={handleNextStep}
            iconAfter={ArrowRight}
            loading={isLoading}
          >
            {t('common.next')}
          </PressableButton>
        </XStack>
      </AnimatedEntry>
    </ViewContainer>
  )
}
