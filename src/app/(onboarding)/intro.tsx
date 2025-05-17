import { ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { H3, XStack, YStack } from 'tamagui'

import {
  Delay,
  H1,
  H2,
  PressableButton,
  ShakeEmoji,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

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
    <ViewContainer edges={['bottom']}>
      <YStack flex={1}>
        <YStack flex={1} gap='$6'>
          <Delay delay={DelayMS.ANIMATION.LONG[0]}>
            <XStack gap='$2'>
              <ShakeEmoji emoji='👋' />
            </XStack>
            <H1>무드로그에 오신 것을 환영합니다!</H1>
          </Delay>
          <Delay delay={DelayMS.ANIMATION.LONG[1]}>
            <YStack gap='$6'>
              <H3 color='$gray11' mb='$4'>
                무드로그는 당신의 일상 감정을 기록하고 분석하는 감정 일기장
                앱입니다.
              </H3>
              <H3 color='$gray11'>
                매일 감정을 기록하고 시간이 지남에 따라 감정 패턴을
                발견해보세요.
              </H3>
            </YStack>
          </Delay>
        </YStack>
        <Delay delay={DelayMS.ANIMATION.LONG[2]}>
          <H2>함께 무드로그를 시작해볼까요?</H2>
        </Delay>
      </YStack>
      <Delay delay={DelayMS.ANIMATION.LONG[3]}>
        <PressableButton
          mt='$8'
          self='flex-end'
          iconAfter={ArrowRight}
          onPress={handleNextButton}
        >
          다음
        </PressableButton>
      </Delay>
    </ViewContainer>
  )
}
