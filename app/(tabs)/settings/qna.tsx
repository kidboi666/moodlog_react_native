import { ChevronDown, ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import {
  Button,
  Input,
  ScrollView,
  Select,
  Text,
  TextArea,
  XStack,
  YStack,
} from 'tamagui'

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
    <ScrollView>
      <YStack p={16} gap={16}>
        <XStack items='center' gap={8}>
          <Button
            icon={ChevronLeft}
            chromeless
            onPress={() => router.back()}
            p={0}
          />
          <Text fontSize={20} fontWeight='bold'>
            {t('settings.qna.title')}
          </Text>
        </XStack>

        <YStack gap={8}>
          <Text fontWeight='bold'>{t('settings.qna.categoryLabel')}</Text>
          <Select value={category} onValueChange={setCategory}>
            <Select.Trigger iconAfter={ChevronDown}>
              <Select.Value
                placeholder={t('settings.qna.categoryPlaceholder')}
              />
            </Select.Trigger>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {categories.map(item => (
                    <Select.Item key={item.value} value={item.value}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>

        <YStack gap={8}>
          <Text fontWeight='bold'>{t('settings.qna.questionLabel')}</Text>
          <TextArea
            height={200}
            placeholder={t('settings.qna.questionPlaceholder')}
            value={question}
            onChangeText={setQuestion}
            autoCapitalize='none'
          />
        </YStack>

        <YStack gap={8}>
          <Text fontWeight='bold'>{t('settings.qna.emailLabel')}</Text>
          <Input
            placeholder={t('settings.qna.emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </YStack>

        <Button
          mt={16}
          bg='$blue10'
          color='white'
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('settings.qna.submitting')
            : t('settings.qna.submitButton')}
        </Button>
      </YStack>
    </ScrollView>
  )
}
