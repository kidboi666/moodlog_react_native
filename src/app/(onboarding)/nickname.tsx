import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { HelperText, IconButton, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import {
  useOnboardingStep,
  useValidationNickname,
} from '@/src/features/onboarding/hooks'
import { FormInput, ScreenView, ShakeEmoji } from '@/src/shared/components'
import { DELAY_MS } from '@/src/shared/constants'

export default function NickNameScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { onNextStep } = useOnboardingStep(1)
  const theme = useTheme()
  const {
    userName,
    error,
    isDisabled,
    handleDraftUserNameChange,
    handleBlurInput,
  } = useValidationNickname()

  const handleNextStep = () => {
    onNextStep()
    router.push('/personality')
  }

  const iconButtonBackgroundColor = isDisabled
    ? theme.colors.surfaceDisabled
    : theme.colors.primary
  const iconColor = isDisabled
    ? theme.colors.onSurfaceDisabled
    : theme.colors.onPrimary

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Animated.View entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG)}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text variant='displaySmall'>
                {t('onboarding.nickname.title')}
              </Text>
              <ShakeEmoji emoji='✏️' />
            </View>
            <Text variant='titleLarge'>
              {t('onboarding.nickname.description')}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 2)}>
          <View style={styles.column}>
            <FormInput
              label={t('onboarding.nickname.label')}
              value={userName}
              onChangeText={handleDraftUserNameChange}
              error={!!error}
              onBlur={handleBlurInput}
              maxLength={10}
              errorMessage={error?.message}
              placeholder={t('onboarding.nickname.placeholder')}
            />
            <HelperText type='info' style={styles.helperText}>
              {t('onboarding.nickname.helper')}
            </HelperText>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeIn.delay(DELAY_MS.ANIMATION.LONG * 3)}
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
