import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H1, H2 } from 'tamagui'

import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useStepProgress } from '@/store'

import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import * as S from '@/styles/screens/onboarding/Welcome.styled'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToNextStep } = useStepProgress()
  const isWelcomePage = currentStep === 0

  const handleClickNextButton = () => {
    if (isWelcomePage) {
      goToNextStep()
      router.push('/nickname')
    }
  }

  return (
    <ViewContainer edges={['bottom']}>
      <S.WelcomeContainer>
        <S.WelcomeContent>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
            <S.TitleBox>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji='👋' />
            </S.TitleBox>
          </FadeIn>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
            <S.DescriptionBox>
              <S.Description1>
                {t('onboarding.welcome.description')}
              </S.Description1>
              <S.Description2>
                {t('onboarding.welcome.description2')}
              </S.Description2>
            </S.DescriptionBox>
          </FadeIn>
        </S.WelcomeContent>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </FadeIn>
      </S.WelcomeContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.NextButton iconAfter={ArrowRight} onPress={handleClickNextButton}>
          {t('common.next')}
        </S.NextButton>
      </FadeIn>
    </ViewContainer>
  )
}
