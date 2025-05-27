import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { H1, H3, H5, ScreenView, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

export default function IntroScreen() {
  const theme = useTheme()
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
          <H1>무드로그에 오신 것을 환영합니다!</H1>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 2)}
          style={styles.descriptionBox}
        >
          <H5 style={{ color: theme.colors.secondary }}>
            무드로그는 당신의 일상 감정을 기록하고 분석하는 감정 일기장
            앱입니다.
          </H5>
          <H5 style={{ color: theme.colors.secondary }}>
            매일 감정을 기록하고 시간이 지남에 따라 감정 패턴을 발견해보세요.
          </H5>
        </Animated.View>
        <Animated.View
          entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 3)}
          style={styles.letsGo}
        >
          <H3>함께 무드로그를 시작해볼까요?</H3>
        </Animated.View>
      </View>
      <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 4)}>
        <IconButton
          icon='arrow-right'
          mode='contained'
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
