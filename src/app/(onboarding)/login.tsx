import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Button, XStack, YStack, styled } from 'tamagui'

import {
  BaseText,
  Delay,
  H1,
  H3,
  PressableButton,
  ViewContainer,
} from '@/components/shared'
import { GoogleIcon } from '@/components/shared/GoogleIcon'
import { DelayMS } from '@/constants'
import { useSignInGoogle, useUpdateUserInfo } from '@/queries'
import { useStepProgress } from '@/store'
import { toSingle } from '@/utils'

export default function LoginScreen() {
  const { draftUserName } = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation()
  const {
    state: { currentStep },
    goToPrevStep,
  } = useStepProgress()
  const isCurrentPage = currentStep === 4
  const { mutateAsync: signInGoogle, isPending, error } = useSignInGoogle()
  const { mutate: updateUserInfo } = useUpdateUserInfo()

  const handlePrevStep = () => {
    if (isCurrentPage) {
      goToPrevStep()
      router.push('/nickname')
    }
  }

  const handleGoogleLogin = async () => {
    const data = await signInGoogle()
    updateUserInfo({ userId: data.user.id, userName: toSingle(draftUserName) })
  }

  return (
    <ViewContainer edges={['bottom']}>
      <YStack flex={1} gap='$6'>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <H1>시작할 준비가 되었어요!</H1>
          <H3 color='$gray11' mt='$4'>
            무드로그를 사용하기 위한 계정을 선택해주세요.
          </H3>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <YStack gap='$6' mt='$4'>
            <GoogleButton
              onPress={handleGoogleLogin}
              disabled={isPending}
              icon={<GoogleIcon />}
            >
              <ButtonText>{t('auth.signInWithGoogle')}</ButtonText>
            </GoogleButton>

            {error && (
              <BaseText color='$red9' text='center'>
                {error.message}
              </BaseText>
            )}
          </YStack>
        </Delay>
      </YStack>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <XStack>
          <PressableButton icon={ArrowLeft} onPress={handlePrevStep}>
            <BaseText>이전</BaseText>
          </PressableButton>
        </XStack>
      </Delay>
    </ViewContainer>
  )
}

const GoogleButton = styled(Button, {
  height: 48,
  bg: 'white',
  borderWidth: 1,
  borderColor: '$gray6',
  flexDirection: 'row',
  items: 'center',
  justify: 'center',
  gap: '$2',
})

const ButtonText = styled(BaseText, {
  color: '$gray12',
  fontWeight: 'bold',
})
