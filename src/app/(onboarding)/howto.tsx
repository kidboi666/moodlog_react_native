import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import {
  BaseText,
  Delay,
  H1,
  H2,
  H3,
  H5,
  ScreenView,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { Colors } from '@/constants/theme'
import { useStepProgress } from '@/store'

interface Props {
  number: string
  title: string
  description: string
}

export default function HowToScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToNextStep,
    goToPrevStep,
  } = useStepProgress()
  const isCurrentPage = currentStep === 2

  const handleNextButton = () => {
    if (isCurrentPage) {
      goToNextStep()
      router.push('/nickname')
    }
  }

  const handlePrevButton = () => {
    if (isCurrentPage) {
      goToPrevStep()
      router.push('/features')
    }
  }

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>무드로그 사용 방법</H1>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <View style={styles.stepBox}>
            <Step
              number='1'
              title='감정 만들기'
              description='먼저 자신만의 감정을 만들고 색상을 지정하세요.'
            />
            <Step
              number='2'
              title='일일 감정 기록'
              description='하루 중 느낀 감정을 선택하고 간단한 메모를 남기세요.'
            />
            <Step
              number='3'
              title='일기 작성'
              description='원하는 경우 더 자세한 일기를 작성할 수 있어요.'
            />
            <Step
              number='4'
              title='통계 확인'
              description='시간이 지나면 감정 패턴을 분석해보세요.'
            />
          </View>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
          <View style={styles.tipBox}>
            <H2>꿀팁!</H2>
            <H5 style={styles.title}>
              매일 같은 시간에 기록하면 더 정확한 감정 패턴을 파악할 수 있어요.
            </H5>
          </View>
        </Delay>
      </View>
      <Delay delay={DelayMS.ANIMATION.MEDIUM[3]}>
        <View style={styles.buttonBox}>
          <Button
            icon='arrow-left'
            mode='contained'
            buttonColor={Colors.button}
            textColor={Colors.buttonText}
            onPress={handlePrevButton}
          >
            이전
          </Button>
          <Button
            icon='arrow-right'
            mode='contained'
            buttonColor={Colors.button}
            textColor={Colors.buttonText}
            onPress={handleNextButton}
          >
            다음
          </Button>
        </View>
      </Delay>
    </ScreenView>
  )
}

function Step({ number, title, description }: Props) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepNumberBox}>
        <H3 style={styles.stepNumber}>{number}</H3>
      </View>
      <View style={styles.stepContentBox}>
        <H3>{title}</H3>
        <BaseText>{description}</BaseText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    flexDirection: 'column',
  },
  stepBox: {
    gap: 16,
  },
  tipBox: {
    backgroundColor: Colors.gray4,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepContainer: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumberBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: 'white',
  },
  stepContentBox: {
    flex: 1,
    gap: 8,
  },
  title: {
    color: Colors.gray11,
  },
})
