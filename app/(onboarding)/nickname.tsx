import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { H2, H3, XStack, YStack } from 'tamagui'

import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useStepProgress } from '@/store'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn'
import { FormInput } from '@/components/shared/FormInput'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const isNicknamePage = currentStep === 1
  const [draftUserName, setDraftUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        const { data, error } = await supabase.auth.signInAnonymously({
          options: {
            data: { user_name: draftUserName },
          },
        })

        if (error) {
          throw error
        }

        // 다음 단계로
        goToNextStep()
        router.push('/benefit')
      } catch (error) {
        console.error('닉네임 저장 오류:', error)
        setError('닉네임을 저장하는 중 오류가 발생했습니다')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H2>{t('onboarding.nickname.title')}</H2>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <H3 color='$gray11'>{t('onboarding.nickname.description')}</H3>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <FormInput
            value={draftUserName}
            onChangeText={handleDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
          {error && <BaseText color='$red9'>{error}</BaseText>}
        </FadeIn>
      </YStack>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
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
      </FadeIn>
    </ViewContainer>
  )
}
