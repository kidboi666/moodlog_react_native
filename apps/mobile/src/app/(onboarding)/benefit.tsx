import { useToastController } from '@tamagui/toast'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H1, YStack } from 'tamagui'

import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable'
import { AUTH_SNAP_POINTS } from '@/core/constants/size'
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time'
import { useAuth } from '@/core/store/auth.store'
import { useBottomSheet } from '@/core/store/bottom-sheet.store'
import { useStepProgress } from '@/core/store/step-progress.store'
import * as S from '@/styles/screens/onboarding/Benefit.styled'
import { BottomSheetType } from '@/types/bottom-sheet.types'
import { ArrowLeft } from '@tamagui/lucide-icons'

export default function Screen() {
  const router = useRouter()
  const { goToPrevStep, currentStep } = useStepProgress()
  const { showBottomSheet } = useBottomSheet()
  const { draftUserName, registerUser, isLoading, error } = useAuth()
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
    showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS)
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
