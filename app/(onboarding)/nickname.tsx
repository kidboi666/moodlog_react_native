import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useStepProgress } from '@/store'

import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { FormInput } from '@/components/shared/FormInput'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/onboarding/Nickname.styled'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const isNicknamePage = currentStep === 1
  const [draftUserName, setDraftUserName] = useState('')

  const handleDraftUserNameChange = (text: string) => {
    setDraftUserName(text)
  }

  const handlePrevStep = () => {
    if (isNicknamePage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleNextStep = () => {
    if (isNicknamePage) {
      goToNextStep()
      router.push('/emotion-type')
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
        </FadeIn>
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
          <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
            {t('common.prev')}
          </PressableButton>
          <PressableButton
            disabled={!draftUserName}
            onPress={handleNextStep}
            iconAfter={ArrowRight}
          >
            {t('common.next')}
          </PressableButton>
        </S.ButtonContainer>
      </FadeIn>
    </ViewContainer>
  )
}
