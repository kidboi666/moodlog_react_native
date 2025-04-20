import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H3, XStack, YStack } from 'tamagui'

import { H1, H2 } from '@/components/shared/Heading'
import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useStepProgress } from '@/store'

import { AnimateMount } from '@/components/shared/AnimateMount'
import { PressableButton } from '@/components/shared/PressableButton'
import { ShakeEmoji } from '@/components/shared/ShakeEmoji'
import { ViewContainer } from '@/components/shared/ViewContainer'

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
      <YStack flex={1}>
        <YStack flex={1} gap='$6'>
          <AnimateMount delay={ANIMATION_DELAY_SECONDS[0]}>
            <XStack gap='$2'>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji='👋' />
            </XStack>
          </AnimateMount>
          <AnimateMount delay={ANIMATION_DELAY_SECONDS[1]}>
            <YStack gap='$6'>
              <H3 color='$gray11' mb='$4'>
                {t('onboarding.welcome.description')}
              </H3>
              <H3 color='$gray11'>{t('onboarding.welcome.description2')}</H3>
            </YStack>
          </AnimateMount>
        </YStack>
        <AnimateMount delay={ANIMATION_DELAY_SECONDS[2]}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </AnimateMount>
      </YStack>
      <AnimateMount delay={ANIMATION_DELAY_SECONDS[3]}>
        <PressableButton
          mt='$8'
          self='flex-end'
          iconAfter={ArrowRight}
          onPress={handleClickNextButton}
        >
          {t('common.next')}
        </PressableButton>
      </AnimateMount>
    </ViewContainer>
  )
}
