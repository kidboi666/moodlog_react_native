import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H3, XStack, YStack } from 'tamagui'

import {
  Delay,
  H1,
  H2,
  PressableButton,
  ShakeEmoji,
  ViewContainer,
} from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'

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
          <Delay delay={DelayMS.ANIMATION.LONG[0]}>
            <XStack gap='$2'>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji='👋' />
            </XStack>
          </Delay>
          <Delay delay={DelayMS.ANIMATION.LONG[1]}>
            <YStack gap='$6'>
              <H3 color='$gray11' mb='$4'>
                {t('onboarding.welcome.description')}
              </H3>
              <H3 color='$gray11'>{t('onboarding.welcome.description2')}</H3>
            </YStack>
          </Delay>
        </YStack>
        <Delay delay={DelayMS.ANIMATION.LONG[2]}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </Delay>
      </YStack>
      <Delay delay={DelayMS.ANIMATION.LONG[3]}>
        <PressableButton
          mt='$8'
          self='flex-end'
          iconAfter={ArrowRight}
          onPress={handleClickNextButton}
        >
          {t('common.next')}
        </PressableButton>
      </Delay>
    </ViewContainer>
  )
}
