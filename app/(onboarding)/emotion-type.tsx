import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Card, View, XStack, YStack } from 'tamagui'

import { H1, H3 } from '@/components/shared/Heading'
import { ANIMATION_DELAY_SECONDS } from '@/constants'
import { useApp, useStepProgress } from '@/store'
import { EmotionDisplayType } from '@/types'

import { BaseText } from '@/components/shared/BaseText'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import { PressableButton } from '@/components/shared/PressableButton'
import { ViewContainer } from '@/components/shared/ViewContainer.styleable'
import { useState } from 'react'

export default function Screen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress()
  const { settings, onSettingChange } = useApp()
  const [showNextButton, setShowNextButton] = useState(false)

  const isEmotionTypePage = currentStep === 2

  const handlePrevStep = () => {
    if (isEmotionTypePage) {
      goToPrevStep()
      router.back()
    }
  }

  const handleNextStep = () => {
    if (isEmotionTypePage) {
      goToNextStep()
      router.push('/benefit')
    }
  }

  const selectEmotionDisplayType = (type: EmotionDisplayType) => {
    onSettingChange('emotionDisplayType', type)
    setShowNextButton(true)
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} justify='center' gap='$4'>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H1>{t('onboarding.emotionType.title')}</H1>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <H3>{t('onboarding.emotionType.description')}</H3>
        </FadeIn>

        <FadeIn flex={1} delay={ANIMATION_DELAY_SECONDS[2]}>
          <XStack gap='$4' justify='center'>
            <Card
              bordered
              elevate
              p='$4'
              flex={1}
              pressStyle={{ scale: 0.95 }}
              animation='bouncy'
              onPress={() =>
                selectEmotionDisplayType(
                  EmotionDisplayType.FOUR_EMOTIONS_THREE_LEVELS,
                )
              }
              borderColor={
                settings.emotionDisplayType ===
                EmotionDisplayType.FOUR_EMOTIONS_THREE_LEVELS
                  ? '$blue10'
                  : undefined
              }
            >
              <YStack gap='$2' items='center'>
                <BaseText fontWeight='bold' fontSize='$6'>
                  {t('onboarding.emotionType.fourEmotions')}
                </BaseText>
                <BaseText text='center'>
                  {t('onboarding.emotionType.fourEmotionsDescription')}
                </BaseText>
                <View p='$2' mt='$2'>
                  <BaseText text='center' fontSize='$4'>
                    😀 😄 😁
                  </BaseText>
                  <BaseText text='center' fontSize='$4'>
                    😔 😢 😭
                  </BaseText>
                  <BaseText text='center' fontSize='$4'>
                    😠 😡 🤬
                  </BaseText>
                  <BaseText text='center' fontSize='$4'>
                    😌 😊 🥰
                  </BaseText>
                </View>
              </YStack>
            </Card>

            <Card
              bordered
              elevate
              p='$4'
              flex={1}
              pressStyle={{ scale: 0.95 }}
              animation='bouncy'
              onPress={() =>
                selectEmotionDisplayType(
                  EmotionDisplayType.FIVE_LEVELS_GOOD_BAD,
                )
              }
              borderColor={
                settings.emotionDisplayType ===
                EmotionDisplayType.FIVE_LEVELS_GOOD_BAD
                  ? '$blue10'
                  : undefined
              }
            >
              <YStack gap='$2' items='center'>
                <BaseText fontWeight='bold' fontSize='$6'>
                  {t('onboarding.emotionType.fiveLevels')}
                </BaseText>
                <BaseText text='center'>
                  {t('onboarding.emotionType.fiveLevelsDescription')}
                </BaseText>
                <View p='$2' mt='$2'>
                  <BaseText text='center' fontSize='$4'>
                    😭 😢 😐 😊 😁
                  </BaseText>
                  <BaseText text='center' fontSize='$4'>
                    {t('onboarding.emotionType.fiveLevelsScale')}
                  </BaseText>
                </View>
              </YStack>
            </Card>
          </XStack>
        </FadeIn>
      </YStack>

      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <XStack justify='space-between'>
          <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
            {t('common.prev')}
          </PressableButton>
          <PressableButton
            disabled={!showNextButton}
            onPress={handleNextStep}
            iconAfter={ArrowRight}
          >
            {t('common.next')}
          </PressableButton>
        </XStack>
      </FadeIn>
    </ViewContainer>
  )
}
