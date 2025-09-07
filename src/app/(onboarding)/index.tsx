import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { ScreenView, ShakeEmoji } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'
import { useStepProgress } from '@/src/shared/context'
import { useTranslation } from 'react-i18next'

export default function IntroScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()

  const handleNextButton = () => {
    setStep(1)
    router.push('/nickname')
  }

  useFocusEffect(
    useCallback(() => {
      setStep(0)
    }, []),
  )

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.content}>
        <Animated.View entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG)}>
          <ShakeEmoji emoji='👋' />
          <Text variant='displaySmall'>{t('onboarding.welcome.title')}</Text>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 2)}
          style={styles.descriptionBox}
        >
          <Text variant='titleLarge'>
            {t('onboarding.welcome.description')}
          </Text>
          <Text variant='titleLarge'>
            {t('onboarding.welcome.description2')}
          </Text>
        </Animated.View>
        <View style={styles.spacer} />
        <Animated.View
          entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 3)}
          style={styles.letsGo}
        >
          <Text variant='headlineSmall'>{t('onboarding.welcome.go')}</Text>
        </Animated.View>
      </View>
      <Animated.View entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 4)}>
        <IconButton
          icon='arrow-right'
          mode='contained'
          size={40}
          onPress={handleNextButton}
          style={styles.button}
        />
      </Animated.View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 24,
    marginBottom: 12,
  },
  descriptionBox: {
    gap: 24,
  },
  spacer: {
    flex: 1,
  },
  letsGo: {
    marginTop: 80,
  },
  button: {
    alignSelf: 'center',
  },
})
