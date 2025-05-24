import { AuthError } from '@supabase/supabase-js'
import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'

import {
  Delay,
  FormInput,
  H1,
  H3,
  H5,
  ScreenView,
  ShakeEmoji,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { useStepProgress } from '@/store'

export default function NickNameScreen() {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()
  const { setStep } = useStepProgress()
  const [draftUserName, setDraftUserName] = useState('')
  const [error, setError] = useState<AuthError | Error | null>(null)

  const handleDraftUserNameChange = (text: string) => {
    setDraftUserName(text)
    if (error) setError(null)
  }

  const handleNextStep = () => {
    if (draftUserName.length < 2 || draftUserName.length > 10) {
      setError(new Error('닉네임 글자수는 2~10자 입니다.'))
    } else if (draftUserName) {
      setStep(2)
      router.push({
        pathname: '/login',
        params: {
          draftUserName,
        },
      })
    }
  }

  useFocusEffect(
    useCallback(() => {
      setStep(1)
    }, []),
  )

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <View style={styles.column}>
            <View style={styles.row}>
              <H1>닉네임 설정</H1>
              <ShakeEmoji emoji='✏️' />
            </View>
            <H3 style={{ color: theme.colors.secondary }}>
              무드로그에서 사용할 닉네임을 입력해주세요.
            </H3>
          </View>
        </Delay>

        <Delay delay={DelayMS.ANIMATION.MEDIUM[1]}>
          <View style={styles.column}>
            <FormInput
              label={t('onboarding.nickname.label')}
              value={draftUserName}
              onChangeText={handleDraftUserNameChange}
              error={!!error}
              errorMessage={error?.message}
              placeholder='닉네임을 입력하세요 (2-10자)'
            />
            <H5 style={{ color: theme.colors.secondary }}>
              닉네임은 언제든지 설정 메뉴에서 변경할 수 있어요.
            </H5>
          </View>
        </Delay>
      </View>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <View style={styles.buttonBox}>
          <IconButton
            icon='arrow-right'
            mode='contained'
            onPress={handleNextStep}
            disabled={!draftUserName}
          />
        </View>
      </Delay>
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
})
