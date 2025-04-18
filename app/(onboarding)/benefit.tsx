import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, XStack, YStack } from 'tamagui'

import { H1, H3, H4 } from '@/components/shared/Heading'
import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useApp, useStepProgress } from '@/store'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const initFirstLaunchStatus = useApp(state => state.initFirstLaunchStatus)
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const isBenefitPage = currentStep === 3

  const handlePrevStep = () => {
    if (isBenefitPage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleClickAgree = () => {
    if (isBenefitPage) {
      initFirstLaunchStatus()
      goToNextStep()
      router.replace('/(tabs)')
    }
  }

  const TIP_COUNT = 5

  const makeTipKey = (index: number) => `onboarding.benefit.tip.${index + 1}`

  const tips = new Array(TIP_COUNT).fill(0).map((_, index) => ({
    key: makeTipKey(index),
  }))

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
            <H1>{t('onboarding.benefit.title')}</H1>
            <YStack bg='$color12' mt='$4' p='$5' gap='$4' rounded='$8'>
              <H3 themeInverse>{t('onboarding.benefit.ota')}</H3>
              <YStack gap='$2'>
                {tips.map(({ key }, index) => (
                  <BaseText key={key} themeInverse>
                    {index + 1}. {t(key)}
                  </BaseText>
                ))}
              </YStack>
            </YStack>
          </FadeIn>

          <FadeIn mt='$4' delay={ANIMATION_DELAY_SECONDS[1]}>
            <YStack gap='$2'>
              <H4>⚠️ {t('onboarding.benefit.warn.1')}</H4>
              <BaseText>{t('onboarding.benefit.warn.2')}</BaseText>
              <BaseText>{t('onboarding.benefit.warn.3')}</BaseText>
              <BaseText>{t('onboarding.benefit.warn.4')}</BaseText>
            </YStack>
          </FadeIn>
        </ScrollView>

        <View flex={1} />

        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <XStack justify='space-between' items='flex-end'>
            <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
              {t('common.prev')}
            </PressableButton>
            <YStack gap='$2'>
              <PressableButton
                themeInverse
                iconAfter={ArrowRight}
                onPress={handleClickAgree}
              >
                {t('common.ok')}
              </PressableButton>
            </YStack>
          </XStack>
        </FadeIn>
      </YStack>
    </ViewContainer>
  )
}
