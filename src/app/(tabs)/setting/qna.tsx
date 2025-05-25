import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, RadioButton } from 'react-native-paper'

import {
  FormInput,
  FormInputArea,
  H1,
  H5,
  H6,
  ScreenView,
} from '@/components/shared'

const categories = [
  { name: 'settings.qna.categoryFeature', value: 'feature' },
  { name: 'settings.qna.categoryUsage', value: 'usage' },
  { name: 'settings.qna.categoryAccount', value: 'account' },
  { name: 'settings.qna.categoryPayment', value: 'payment' },
  { name: 'settings.qna.categoryEtc', value: 'etc' },
]

export default function QnA() {
  const router = useRouter()
  const { t } = useTranslation()
  const [question, setQuestion] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!question.trim()) {
      Alert.alert(t('alert'), t('settings.qna.alertQuestionRequired'))
      return
    }

    if (!email.trim()) {
      Alert.alert(t('alert'), t('settings.qna.alertEmailRequired'))
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 실제 제출 기능 구현
      // 예: 이메일 전송 API 호출 또는 데이터베이스에 저장
      await new Promise(resolve => setTimeout(resolve, 1000)) // 가상 지연

      Alert.alert(
        t('settings.qna.submitComplete'),
        t('settings.qna.submitMessage'),
        [{ text: t('confirm'), onPress: () => router.back() }],
      )
    } catch (error) {
      Alert.alert(t('error'), t('settings.qna.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScreenView withScroll edges={['bottom']} padded style={styles.container}>
      <View style={styles.contentBox}>
        <H5>{t('settings.qna.categoryLabel')}</H5>
        <RadioButton.Group value={category} onValueChange={setCategory}>
          {useMemo(
            () =>
              categories.map(item => (
                <RadioButton.Item
                  key={item.value}
                  label={t(item.name)}
                  value={item.value}
                />
              )),
            [],
          )}
        </RadioButton.Group>
      </View>

      <View style={styles.menu}>
        <H5>{t('settings.qna.questionLabel')}</H5>
        <FormInputArea
          placeholder={t('settings.qna.questionPlaceholder')}
          value={question}
          onChangeText={setQuestion}
          autoCapitalize='none'
          style={{ height: 200 }}
        />
      </View>
      <View style={styles.menu}>
        <H6>{t('settings.qna.emailLabel')}</H6>
        <FormInput
          placeholder={t('settings.qna.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </View>
      <Button mode='elevated' onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting
          ? t('settings.qna.submitting')
          : t('settings.qna.submitButton')}
      </Button>
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  contentBox: {
    gap: 4,
  },
  menu: {
    gap: 4,
  },
})
