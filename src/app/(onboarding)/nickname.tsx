import { AuthError } from '@supabase/supabase-js'
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import {
  BaseText,
  Delay,
  FormInput,
  H1,
  H3,
  PressableButton,
  ShakeEmoji,
  ViewContainer,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

export default function NickNameScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToNextStep,
    goToPrevStep,
  } = useStepProgress()
  const [draftUserName, setDraftUserName] = useState('')
  const [error, setError] = useState<AuthError | Error | null>(null)
  const isCurrentPage = currentStep === 3

  const handleDraftUserNameChange = (text: string) => {
    setDraftUserName(text)
    if (error) setError(null)
  }

  const handlePrevStep = () => {
    if (isCurrentPage) {
      goToPrevStep()
      router.push('/howto')
    }
  }

  const handleNextStep = () => {
    if (isCurrentPage && draftUserName) {
      goToNextStep()
      router.push({
        pathname: '/login',
        params: {
          draftUserName,
        },
      })
    } else if (!draftUserName) {
      setError(new Error('닉네임을 입력해주세요.'))
    }
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <YStack gap='$2'>
            <XStack gap='$2'>
              <H1>닉네임 설정</H1>
              <ShakeEmoji emoji='✏️' />
            </XStack>
            <H3 color='$gray11'>무드로그에서 사용할 닉네임을 입력해주세요.</H3>
          </YStack>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <YStack gap='$4'>
            <FormInput
              value={draftUserName}
              onChangeText={handleDraftUserNameChange}
              placeholder='닉네임을 입력하세요 (2-10자)'
            />
            {error && <BaseText color='$red9'>{error.message}</BaseText>}
            <H3 color='$gray11'>
              닉네임은 언제든지 설정 메뉴에서 변경할 수 있어요.
            </H3>
          </YStack>
        </Delay>
      </YStack>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <XStack justify='space-between'>
          <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
            이전
          </PressableButton>

          <PressableButton
            iconAfter={ArrowRight}
            onPress={handleNextStep}
            disabled={!draftUserName}
          >
            다음
          </PressableButton>
        </XStack>
      </Delay>
    </ViewContainer>
  )
}
