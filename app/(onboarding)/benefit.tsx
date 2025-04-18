import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, XStack, YStack } from 'tamagui'

import { H1, H3 } from '@/components/shared/Heading'
import { ANIMATION_DELAY_SECONDS, AUTH_SNAP_POINTS } from '@/constants'
import { useApp, useBottomSheet, useStepProgress } from '@/store'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import { BottomSheetType } from '@/types'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const initFirstLaunchStatus = useApp(state => state.initFirstLaunchStatus)
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()
  const isBenefitPage = currentStep === 3

  const handlePrevStep = () => {
    if (isBenefitPage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleClickAgree = () => {
    if (isBenefitPage) {
      showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS, {
        hideBottomSheet,
      })
    }
  }

  const handleClickDisagree = () => {
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
        <View flex={1} />
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <XStack justify='space-between' items='flex-end'>
            <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
              {t('common.prev')}
            </PressableButton>
            <YStack gap='$2'>
              <PressableButton
                themeInverse
                iconAfter={ArrowRight}
                onPress={handleClickDisagree}
              >
                {t('common.skip')}
              </PressableButton>
              <PressableButton
                themeInverse
                iconAfter={ArrowRight}
                onPress={handleClickAgree}
              >
                {t('common.join')}
              </PressableButton>
            </YStack>
          </XStack>
        </FadeIn>
      </YStack>
    </ViewContainer>
  )
}
