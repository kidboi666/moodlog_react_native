import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useStepProgress } from '@/store'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { FormInput } from '@/components/shared/FormInput'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/onboarding/Nickname.styled'
import { Spinner } from 'tamagui'

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
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <S.Title>{t('onboarding.nickname.title')}</S.Title>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.Description>{t('onboarding.nickname.description')}</S.Description>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <FormInput
            value={draftUserName}
            onChangeText={handleDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
          {error && <BaseText color='$red9'>{error}</BaseText>}
        </FadeIn>
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
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
            isLoading={isLoading}
          >
            {t('common.next')}
          </PressableButton>
        </S.ButtonContainer>
      </FadeIn>
    </ViewContainer>
  )
}
