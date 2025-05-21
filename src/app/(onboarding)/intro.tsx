import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { Delay, H1, H3, H5, ScreenView, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { Colors } from '@/constants/theme'
import { useStepProgress } from '@/store'
import { Button } from 'react-native-paper'

export default function IntroScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToNextStep,
  } = useStepProgress()
  const isCurrentPage = currentStep === 0

  const handleNextButton = () => {
    if (isCurrentPage) {
      goToNextStep()
      router.push('/features')
    }
  }

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.content}>
        <Delay delay={DelayMS.ANIMATION.LONG[0]}>
          <ShakeEmoji emoji='👋' />
          <H1>무드로그에 오신 것을 환영합니다!</H1>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.LONG[1]} style={styles.descriptionBox}>
          <H5 style={styles.description}>
            무드로그는 당신의 일상 감정을 기록하고 분석하는 감정 일기장
            앱입니다.
          </H5>
          <H5 style={styles.description}>
            매일 감정을 기록하고 시간이 지남에 따라 감정 패턴을 발견해보세요.
          </H5>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.LONG[2]} style={styles.letsGo}>
          <H3>함께 무드로그를 시작해볼까요?</H3>
        </Delay>
      </View>
      <Delay delay={DelayMS.ANIMATION.LONG[3]}>
        <Button
          icon='arrow-right'
          mode='contained'
          buttonColor={Colors.button}
          textColor={Colors.buttonText}
          onPress={handleNextButton}
          style={styles.button}
          contentStyle={styles.flexReverse}
        >
          다음
        </Button>
      </Delay>
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  flexReverse: {
    flexDirection: 'row-reverse',
  },
  description: {
    color: Colors.gray10,
  },
})
