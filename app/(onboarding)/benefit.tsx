import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, XStack, YStack } from 'tamagui'

import {
  BaseText,
  Delay,
  H1,
  H3,
  H4,
  PressableButton,
  ViewContainer,
} from '@/shared/components'
import { DelayMS } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToPrevStep,
    goToNextStep,
  } = useStepProgress()
  const isIntroPage = currentStep === 2

  const handlePrevStep = () => {
    if (isIntroPage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleClickAgree = () => {
    if (isIntroPage) {
      goToNextStep()
      router.replace('/(tabs)')
    }
  }

  const FEATURE_COUNT = 5

  const makeFeatureKey = (index: number) =>
    `onboarding.intro.feature.${index + 1}`

  const features = new Array(FEATURE_COUNT).fill(0).map((_, index) => ({
    key: makeFeatureKey(index),
  }))

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$4'>
        <ScrollView>
          <Delay delay={DelayMS.ANIMATION.LONG[0]}>
            <H1>{t('onboarding.intro.title')}</H1>
            <YStack bg='$color12' mt='$4' p='$5' gap='$4' rounded='$8'>
              <H3 themeInverse>{t('onboarding.intro.subtitle')}</H3>
              <YStack gap='$2'>
                {features.map(({ key }, index) => (
                  <BaseText key={key} themeInverse>
                    {index + 1}. {t(key)}
                  </BaseText>
                ))}
              </YStack>
            </YStack>
          </Delay>

          <Delay mt='$4' delay={DelayMS.ANIMATION.LONG[1]}>
            <YStack gap='$2'>
              <H4>💡 {t('onboarding.intro.note.1')}</H4>
              <BaseText>{t('onboarding.intro.note.2')}</BaseText>
              <BaseText>{t('onboarding.intro.note.3')}</BaseText>
              <BaseText>{t('onboarding.intro.note.4')}</BaseText>
            </YStack>
          </Delay>
        </ScrollView>

        <View flex={1} />

        <Delay delay={DelayMS.ANIMATION.LONG[2]}>
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
