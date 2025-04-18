import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H1, YStack } from 'tamagui'

import { ANIMATION_DELAY_SECONDS, AUTH_SNAP_POINTS } from '@/constants'
import { useAuth, useBottomSheet, useStepProgress } from '@/store'
import { BottomSheetType } from '@/types'

import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/onboarding/Benefit.styled'
import { ArrowLeft } from '@tamagui/lucide-icons'

export default function Screen() {
  const router = useRouter()
  const { goToPrevStep, currentStep } = useStepProgress()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const { draftUserName, registerUser, isLoading } = useAuth()
  const { t } = useTranslation()
  const toast = useToastController()
  const isBenefitPage = currentStep === 2

  const handlePrevStep = () => {
    if (isBenefitPage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleRegister = () => {
    showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS, {
      hideBottomSheet,
    })
  }

  const handleSkip = async () => {
    if (isLoading) return

    try {
      await registerUser(draftUserName)
      router.replace('/(tabs)')
    } catch (error) {
      toast.show(t('notifications.error.guest.title'), {
        message: error || t('notifications.error.guest.message'),
        preset: 'error',
      })
    }
  }

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H1>{t('onboarding.benefits.title')}</H1>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.BenefitsContainer>
            <S.BenefitTitle>{t('onboarding.benefits.ota')}</S.BenefitTitle>
            <S.BenefitsBox>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.sync')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.backup')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.profile')}
              </S.BenefitText>
            </S.BenefitsBox>
          </S.BenefitsContainer>
        </FadeIn>
        <S.RestBox />
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
          <S.PrevButton onPress={handlePrevStep} icon={ArrowLeft}>
            {t('common.prev')}
          </S.PrevButton>
          <YStack>
            <FadeIn delay={ANIMATION_DELAY_SECONDS[4]}>
              <S.SkipButton onPress={handleSkip} disabled={isLoading}>
                {t('common.skip')}
              </S.SkipButton>
            </FadeIn>

            <S.ConfirmButton onPress={handleRegister} disabled={isLoading}>
              {t('common.join')}
            </S.ConfirmButton>
          </YStack>
        </S.ButtonContainer>
      </FadeIn>
    </ViewContainer>
  )
}
