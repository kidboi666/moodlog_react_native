import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { ScreenView, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/context'

export default function IntroScreen() {
  const router = useRouter()
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
        <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.LONG)}>
          <ShakeEmoji emoji='👋' />
          <Text variant='displayLarge'>무드로그에 오신 것을 환영합니다!</Text>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 2)}
          style={styles.descriptionBox}
        >
          <Text variant='titleLarge'>
            무드로그는 당신의 일상 감정을 기록하고 분석하는 감정 일기장
            앱입니다.
          </Text>
          <Text variant='titleLarge'>
            매일 감정을 기록하고 시간이 지남에 따라 감정 패턴을 발견해보세요.
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 3)}
          style={styles.letsGo}
        >
          <Text variant='displaySmall'>함께 무드로그를 시작해볼까요?</Text>
        </Animated.View>
      </View>
      <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 4)}>
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
  letsGo: {
    marginTop: 80,
  },
  button: {
    alignSelf: 'center',
  },
})
