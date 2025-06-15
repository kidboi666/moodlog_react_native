import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { HelperText, IconButton, Text } from 'react-native-paper'
import Animated, { FadeIn } from 'react-native-reanimated'

import { FormInput, ScreenView, ShakeEmoji } from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/context'
import { useApp } from '@/store'

export default function NickNameScreen() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const { setUserName, userName } = useApp()
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
        <IconButton
          icon='arrow-right'
          mode='contained'
          size={40}
          onPress={handleNextStep}
          disabled={isDisabled}
        />
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
  helperText: {
    fontSize: 16,
  },
})
