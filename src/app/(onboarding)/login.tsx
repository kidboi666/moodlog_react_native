import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import {
  BaseText,
  Delay,
  GoogleIcon,
  H1,
  H3,
  ScreenView,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useColors, useThemedStyles } from '@/hooks'
import { useSignInGoogle, useUpdateUserInfo } from '@/queries'
import { useStepProgress } from '@/store'
import { toSingle } from '@/utils'

export default function LoginScreen() {
  const { draftUserName } = useLocalSearchParams()
  const router = useRouter()
  const { colors, tokens } = useColors()
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

  const themedStyles = useThemedStyles(({ colors }) => ({
    description: {
      color: colors.text.secondary,
    },
    error: {
      color: tokens.semantic.error.main,
    },
  }))

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]} style={styles.header}>
          <H1>시작할 준비가 되었어요!</H1>
          <H3 style={themedStyles.description}>
            무드로그를 사용하기 위한 계정을 선택해주세요.
          </H3>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <View style={styles.submitBox}>
            <Button
              mode='contained'
              onPress={handleGoogleLogin}
              disabled={isPending}
              loading={isPending}
              icon={GoogleIcon}
              buttonColor={colors.action.primary}
              textColor={colors.text.inverse}
            >
              {t('auth.signInWithGoogle')}
            </Button>

            {error && (
              <BaseText style={[styles.error]}>{error.message}</BaseText>
            )}
          </View>
        </Delay>
      </View>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <Button
          icon='arrow-left'
          mode='contained'
          buttonColor={colors.action.primary}
          textColor={colors.text.inverse}
          style={styles.button}
          onPress={handlePrevStep}
          disabled={isPending}
        >
          {t('common.prev')}
        </Button>
      </Delay>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  header: {
    gap: 24,
  },
  googleButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  error: {
    textAlign: 'center',
  },
  submitBox: {
    gap: 12,
  },
  button: {
    alignSelf: 'flex-start',
  },
})
