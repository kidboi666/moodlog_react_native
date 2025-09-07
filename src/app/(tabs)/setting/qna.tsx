import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet } from 'react-native'
import { Button, List, RadioButton, TextInput } from 'react-native-paper'

import { ScreenView } from '@/src/components/shared'

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
      <List.Section>
        <List.Subheader>{t('settings.qna.categoryLabel')}</List.Subheader>
        <RadioButton.Group value={category} onValueChange={setCategory}>
          {categories.map(item => (
            <RadioButton.Item
              key={item.value}
              label={t(item.name)}
              value={item.value}
            />
          ))}
        </RadioButton.Group>
      </List.Section>

      <List.Section>
        <List.Subheader>{t('settings.qna.questionLabel')}</List.Subheader>
        <TextInput
          mode='outlined'
          value={question}
          onChangeText={setQuestion}
          placeholder={t('settings.qna.questionPlaceholder')}
          multiline
          style={{ height: 120 }}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>{t('settings.qna.emailLabel')}</List.Subheader>
        <TextInput
          mode='outlined'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          placeholder={t('settings.qna.emailPlaceholder')}
        />
      </List.Section>
      <Button
        mode='contained'
        onPress={handleSubmit}
        disabled={isSubmitting}
        style={styles.button}
      >
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
    gap: 8,
  },
  button: {
    marginTop: 40,
  },
})
