import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import { Delay, H1, H3, ScreenView } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useColors, useThemedStyles } from '@/hooks'
import { useStepProgress } from '@/store'

interface Props {
  emoji: string
  title: string
  description: string
}

export default function FeaturesScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToNextStep,
    goToPrevStep,
  } = useStepProgress()
  const isCurrentPage = currentStep === 1
  const { colors } = useColors()

  const handleNextButton = () => {
    if (isCurrentPage) {
      goToNextStep()
      router.push('/howto')
    }
  }

  const handlePrevButton = () => {
    if (isCurrentPage) {
      goToPrevStep()
      router.push('/intro')
    }
  }

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>주요 기능</H1>
        </Delay>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <View style={styles.contentBox}>
            <Feature
              emoji='📝'
              title='일기 작성'
              description='매일 감정과 경험을 간단하게 기록해보세요.'
            />
            <Feature
              emoji='🎨'
              title='나만의 감정'
              description='자신만의 감정을 정의하고 색상을 지정해보세요.'
            />
            <Feature
              emoji='📊'
              title='감정 통계'
              description='시간이 지남에 따라 감정 변화와 패턴을 분석해보세요.'
            />
            <Feature
              emoji='📅'
              title='캘린더 보기'
              description='달력으로 과거 감정을 한눈에 확인해보세요.'
            />
          </View>
        </Delay>
      </View>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <View style={styles.buttonBox}>
          <Button
            mode='contained'
            buttonColor={colors.background.primary}
            textColor={colors.text.primary}
            icon='arrow-left'
            onPress={handlePrevButton}
          >
            {t('common.prev')}
          </Button>
          <Button
            mode='contained'
            buttonColor={colors.background.primary}
            textColor={colors.text.primary}
            icon='arrow-right'
            contentStyle={styles.buttonInner}
            onPress={handleNextButton}
          >
            {t('common.next')}
          </Button>
        </View>
      </Delay>
    </ScreenView>
  )
}

function Feature({ emoji, title, description }: Props) {
  const themedStyles = useThemedStyles(({ colors }) => ({
    featureContainer: {
      backgroundColor: colors.background.secondary,
    },
  }))
  return (
    <View style={[styles.featureContainer, themedStyles.featureContainer]}>
      <H1>{emoji}</H1>
      <View style={styles.featureBox}>
        <H3>{title}</H3>
        <Text>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    gap: 24,
  },
  contentBox: {
    gap: 16,
  },
  featureContainer: {
    gap: 16,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureBox: {
    gap: 4,
    flex: 1,
  },
  featureTitle: {
    fontWeight: 'bold',
  },
  buttonInner: {
    flexDirection: 'row-reverse',
  },
})
