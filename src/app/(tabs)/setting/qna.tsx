import { ChevronDown } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'

import {
  FormInput,
  FormInputArea,
  H1,
  H6,
  PressableButton,
  ScreenView,
} from '@/components/shared'
import { List } from 'react-native-paper'

export default function QnA() {
  const router = useRouter()
  const { t } = useTranslation()
  const [question, setQuestion] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { name: t('settings.qna.categoryFeature'), value: 'feature' },
    { name: t('settings.qna.categoryUsage'), value: 'usage' },
    { name: t('settings.qna.categoryAccount'), value: 'account' },
    { name: t('settings.qna.categoryPayment'), value: 'payment' },
    { name: t('settings.qna.categoryEtc'), value: 'etc' },
  ]

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
      <H1>{t('settings.qna.title')}</H1>
      <View style={styles.contentBox}>
        <H6>{t('settings.qna.categoryLabel')}</H6>
        <List.Section value={category} onValueChange={setCategory}>
          <List.Trigger iconAfter={ChevronDown}>
            <Select.Value placeholder={t('settings.qna.categoryPlaceholder')} />
          </List.Trigger>

          <Select.Content zIndex={200_000}>
            <Select.ScrollUpButton />
            <Select.Viewport minW={200}>
              <Select.Group>
                <Select.Label>Menu</Select.Label>
                {useMemo(
                  () =>
                    categories.map((item, i) => (
                      <Select.Item
                        key={item.value}
                        index={i}
                        value={item.value}
                      >
                        <Select.ItemText>{item.name}</Select.ItemText>
                      </Select.Item>
                    )),
                  [],
                )}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </List.Section>
      </View>

      <YStack gap='$2'>
        <H6>{t('settings.qna.questionLabel')}</H6>
        <FormInputArea
          height={200}
          placeholder={t('settings.qna.questionPlaceholder')}
          value={question}
          onChangeText={setQuestion}
          autoCapitalize='none'
        />
      </YStack>
      <YStack gap='$2'>
        <H6>{t('settings.qna.emailLabel')}</H6>
        <FormInput
          placeholder={t('settings.qna.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </YStack>
      <PressableButton
        mt='$4'
        bg='$color12'
        color='white'
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? t('settings.qna.submitting')
          : t('settings.qna.submitButton')}
      </PressableButton>
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
})
