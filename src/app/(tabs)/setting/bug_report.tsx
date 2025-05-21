import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

import {
  FormInput,
  FormInputArea,
  H1,
  H4,
  PressableButton,
  ScreenView,
} from '@/components/shared'

export default function BugReportScreen() {
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
      <ScreenView edges={['bottom']} padded style={styles.container}>
        <View style={styles.titleBox}>
          <H1>{t('settings.bugReport.title')}</H1>
        </View>

        <View style={styles.column}>
          <H4>{t('settings.bugReport.descriptionLabel')}</H4>
          <FormInputArea
            value={bugDescription}
            onChangeText={setBugDescription}
            placeholder={t('settings.bugReport.descriptionPlaceholder')}
            height={150}
            autoCapitalize='none'
          />
        </View>

        <View style={styles.column}>
          <H4>{t('settings.bugReport.emailLabel')}</H4>
          <FormInput
            value={email}
            onChangeText={setEmail}
            placeholder={t('settings.bugReport.emailPlaceholder')}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </View>

        <View style={styles.column}>
          <H4>{t('settings.bugReport.screenshotLabel')}</H4>
          <PressableButton onPress={pickImage}>
            {t('settings.bugReport.attachScreenshot')}
          </PressableButton>
          {image && (
            <View style={styles.imageBox}>
              <Image source={image} />
              <PressableButton onPress={() => setImage(null)}>
                {t('settings.bugReport.deleteImage')}
              </PressableButton>
            </View>
          )}
        </View>

        <PressableButton
          bg='$color12'
          color='white'
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('settings.bugReport.submitting')
            : t('settings.bugReport.submitButton')}
        </PressableButton>
      </ScreenView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  column: {
    flexDirection: 'column',
    gap: 8,
  },
  imageBox: {
    marginTop: 8,
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
})
