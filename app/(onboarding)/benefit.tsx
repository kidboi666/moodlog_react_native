import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, XStack, YStack } from 'tamagui'

import { ANIMATION_DELAY_MS_LONG } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'

import {
  BaseText,
  Delay,
  H1,
  H3,
  H4,
  PressableButton,
  ViewContainer,
} from '@/shared/components'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const isBenefitPage = currentStep === 2

  const handlePrevStep = () => {
    if (isBenefitPage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleClickAgree = () => {
    if (isBenefitPage) {
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
          <Delay delay={ANIMATION_DELAY_MS_LONG[0]}>
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
          </Delay>

          <Delay mt='$4' delay={ANIMATION_DELAY_MS_LONG[1]}>
            <YStack gap='$2'>
              <H4>⚠️ {t('onboarding.benefit.warn.1')}</H4>
              <BaseText>{t('onboarding.benefit.warn.2')}</BaseText>
              <BaseText>{t('onboarding.benefit.warn.3')}</BaseText>
              <BaseText>{t('onboarding.benefit.warn.4')}</BaseText>
            </YStack>
          </Delay>
        </ScrollView>

        <View flex={1} />

        <Delay delay={ANIMATION_DELAY_MS_LONG[2]}>
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
        </Delay>
      </YStack>
    </ViewContainer>
  )
}
