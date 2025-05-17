import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

import {
  Delay,
  H1,
  H3,
  PressableButton,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

interface Props {
  emoji: string
  title: string
  description: string
}

function Feature({ emoji, title, description }: Props) {
  return (
    <FeatureContainer>
      <EmojiText>{emoji}</EmojiText>
      <FeatureInfo>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureInfo>
    </FeatureContainer>
  )
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
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>주요 기능</H1>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <FeaturesContainer>
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
          </FeaturesContainer>
        </Delay>
      </YStack>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
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
const FeaturesContainer = styled(YStack, {
  gap: '$4',
})

const FeatureContainer = styled(XStack, {
  gap: '$4',
  p: '$3',
  bg: '$color4',
  rounded: '$4',
  items: 'center',
})

const EmojiText = styled(H1, {
  fontSize: '$9',
})

const FeatureInfo = styled(YStack, {
  gap: '$1',
  flex: 1,
})

const FeatureTitle = styled(H3, {
  fontWeight: 'bold',
})

const FeatureDescription = styled(H3, {
  color: '$gray11',
  fontSize: '$5',
})
