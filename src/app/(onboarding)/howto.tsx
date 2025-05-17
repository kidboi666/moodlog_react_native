import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

import {
  Delay,
  H1,
  H2,
  H3,
  PressableButton,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

interface Props {
  number: string
  title: string
  description: string
}

const Step = ({ number, title, description }: Props) => {
  return (
    <StepContainer>
      <StepNumberContainer>
        <StepNumber>{number}</StepNumber>
      </StepNumberContainer>
      <StepContent>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </StepContent>
    </StepContainer>
  )
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
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>무드로그 사용 방법</H1>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <StepsContainer>
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
          </StepsContainer>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
          <TipContainer>
            <H2>꿀팁!</H2>
            <H3 color='$gray11'>
              매일 같은 시간에 기록하면 더 정확한 감정 패턴을 파악할 수 있어요.
            </H3>
          </TipContainer>
        </Delay>
      </YStack>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[3]}>
        <XStack justify='space-between'>
          <PressableButton icon={ArrowLeft} onPress={handlePrevButton}>
            이전
          </PressableButton>

          <PressableButton iconAfter={ArrowRight} onPress={handleNextButton}>
            다음
          </PressableButton>
        </XStack>
      </Delay>
    </ViewContainer>
  )
}

// 스타일 컴포넌트
const StepsContainer = styled(YStack, {
  gap: '$4',
})

const StepContainer = styled(XStack, {
  gap: '$4',
  items: 'flex-start',
})

const StepNumberContainer = styled(YStack, {
  width: 40,
  height: 40,
  rounded: 20,
  bg: '$color12',
  justify: 'center',
  items: 'center',
})

const StepNumber = styled(H2, {
  color: 'white',
})

const StepContent = styled(YStack, {
  flex: 1,
  gap: '$2',
})

const StepTitle = styled(H3, {
  fontWeight: 'bold',
})

const StepDescription = styled(H3, {
  color: '$gray11',
  fontSize: '$5',
})

const TipContainer = styled(YStack, {
  bg: '$color5',
  p: '$4',
  rounded: '$4',
  gap: '$2',
})
