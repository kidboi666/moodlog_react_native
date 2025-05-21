import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { Button, MD3Colors, TextInput } from 'react-native-paper'

import {
  BaseText,
  Delay,
  FormInput,
  H1,
  H3,
  H5,
  ScreenView,
  ShakeEmoji,
} from '@/components/shared'
import { DelayMS } from '@/constants'
import { Colors } from '@/constants/theme'
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
    if (draftUserName.length < 2 || draftUserName.length > 10) {
      setError(new Error('닉네임 글자수는 2~10자 입니다.'))
    } else if (isCurrentPage && draftUserName) {
      goToNextStep()
      router.push({
        pathname: '/login',
        params: {
          draftUserName,
        },
      })
    }
  }

  return (
    <ScreenView edges={['bottom']}>
      <View style={styles.container}>
        <Delay delay={DelayMS.ANIMATION.MEDIUM[0]}>
          <View style={styles.column}>
            <View style={styles.row}>
              <H1>닉네임 설정</H1>
              <ShakeEmoji emoji='✏️' />
            </View>
            <H3 style={styles.description}>
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
              placeholder='닉네임을 입력하세요 (2-10자)'
            />
            {error && <BaseText style={styles.error}>{error.message}</BaseText>}
            <H5 style={styles.description}>
              닉네임은 언제든지 설정 메뉴에서 변경할 수 있어요.
            </H5>
          </View>
        </Delay>
      </View>

      <Delay delay={DelayMS.ANIMATION.MEDIUM[2]}>
        <View style={styles.buttonBox}>
          <Button
            icon='arrow-left'
            mode='contained'
            buttonColor={Colors.button}
            textColor={Colors.buttonText}
            onPress={handlePrevStep}
          >
            이전
          </Button>

          <Button
            icon='arrow-right'
            mode='contained'
            buttonColor={Colors.button}
            textColor={Colors.buttonText}
            onPress={handleNextStep}
            disabled={!draftUserName}
          >
            다음
          </Button>
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
  description: {
    color: Colors.gray10,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    color: MD3Colors.error40,
  },
})
