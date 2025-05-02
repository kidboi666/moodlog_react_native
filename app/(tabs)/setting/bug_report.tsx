import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import {
  Image,
  Input,
  ScrollView,
  Text,
  TextArea,
  XStack,
  YStack,
} from 'tamagui'

import { H1, PressableButton, ViewContainer } from '@/shared/components'

export default function BugReport() {
  const router = useRouter()
  const { t } = useTranslation()
  const [bugDescription, setBugDescription] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    if (!bugDescription.trim()) {
      Alert.alert(t('alert'), t('bug_report.alert_description_required'))
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 실제 제출 기능 구현
      await new Promise(resolve => setTimeout(resolve, 1000)) // 가상 지연

      Alert.alert(
        t('bug_report.submit_complete'),
        t('bug_report.submit_message'),
        [{ text: t('confirm'), onPress: () => router.back() }],
      )
    } catch (error) {
      Alert.alert(t('error'), t('bug_report.submit_error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollView>
      <ViewContainer edges={['bottom']} padded>
        <YStack gap='$4'>
          <XStack items='center' gap='$2'>
            <H1>{t('settings.bugReport.title')}</H1>
          </XStack>

          <YStack gap='$2'>
            <Text fontWeight='bold'>
              {t('settings.bugReport.descriptionLabel')}
            </Text>
            <TextArea
              height={150}
              placeholder={t('settings.bugReport.descriptionPlaceholder')}
              value={bugDescription}
              onChangeText={setBugDescription}
              autoCapitalize='none'
            />
          </YStack>

          <YStack gap='$2'>
            <Text fontWeight='bold'>{t('settings.bugReport.emailLabel')}</Text>
            <Input
              placeholder={t('settings.bugReport.emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              keyboardType='email-address'
            />
          </YStack>

          <YStack gap='$2'>
            <Text fontWeight='bold'>
              {t('settings.bugReport.screenshotLabel')}
            </Text>
            <PressableButton onPress={pickImage}>
              {t('settings.bugReport.attachScreenshot')}
            </PressableButton>
            {image && (
              <YStack mt='$2' items='center'>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
                <PressableButton
                  mt='$2'
                  variant='outlined'
                  onPress={() => setImage(null)}
                >
                  {t('settings.bugReport.deleteImage')}
                </PressableButton>
              </YStack>
            )}
          </YStack>

          <PressableButton
            mt='$4'
            bg='$blue10'
            color='white'
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t('settings.bugReport.submitting')
              : t('settings.bugReport.submitButton')}
          </PressableButton>
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
