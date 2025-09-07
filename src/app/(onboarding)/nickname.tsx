import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { HelperText, IconButton, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { FormInput, ScreenView, ShakeEmoji } from '@/src/components/shared'
import { DelayMS } from '@/src/constants'
import { useStepProgress } from '@/src/context'
import { useApp } from '@/src/store'

export default function NickNameScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const { setUserName, userName } = useApp()
  const { colors } = useTheme()
  const [error, setError] = useState<Error | null>(null)

  const handleDraftUserNameChange = (text: string) => {
    setUserName(text)
    if (error) setError(null)
  }

  const handleBlur = () => {
    if (isDisabled) {
      setError(new Error('닉네임 글자수는 2~10자 입니다.'))
    }
  }

  const handleNextStep = () => {
    setStep(2)
    router.push('/personality')
  }

  useFocusEffect(
    useCallback(() => {
      setStep(1)
    }, []),
  )

  const isDisabled = !userName || userName.length <= 2 || userName.length > 10

  const iconButtonBackgroundColor = isDisabled
    ? colors.surfaceDisabled
    : colors.primary
  const iconColor = isDisabled ? colors.onSurfaceDisabled : colors.onPrimary

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.LONG)}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text variant='displayLarge'>닉네임 설정</Text>
              <ShakeEmoji emoji='✏️' />
            </View>
            <Text variant='titleLarge'>
              무드로그에서 사용할 닉네임을 입력해주세요.
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 2)}>
          <View style={styles.column}>
            <FormInput
              label={t('onboarding.nickname.label')}
              value={userName}
              onChangeText={handleDraftUserNameChange}
              error={!!error}
              onBlur={handleBlur}
              maxLength={10}
              errorMessage={error?.message}
              placeholder='닉네임을 입력하세요 (2-10자)'
            />
            <HelperText type='info' style={styles.helperText}>
              닉네임은 언제든지 설정 메뉴에서 변경할 수 있어요.
            </HelperText>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeIn.delay(DelayMS.ANIMATION.LONG * 3)}
        style={styles.buttonBox}
      >
        <View
          style={[
            styles.iconButtonWrapper,
            { backgroundColor: iconButtonBackgroundColor },
          ]}
        >
          <IconButton
            icon='arrow-right'
            iconColor={iconColor}
            size={40}
            onPress={handleNextStep}
            disabled={isDisabled}
            style={styles.iconButton}
          />
        </View>
      </Animated.View>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flexDirection: 'column',
    gap: 8,
  },
  buttonBox: {
    alignSelf: 'center',
  },
  iconButtonWrapper: {
    borderRadius: 28, // 버튼을 원형으로 만들기 위한 값. (size(40) + 내부 패딩) / 2
    // Android 그림자
    elevation: 4,
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconButton: {
    // IconButton은 기본 마진이 있으므로, wrapper의 중앙에 위치시키기 위해 제거합니다.
    margin: 0,
  },
  helperText: {
    fontSize: 16,
  },
})
