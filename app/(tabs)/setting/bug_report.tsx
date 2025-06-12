import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, List, TextInput } from 'react-native-paper'

import { FormInput, ScreenView } from '@/components/shared'

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
    <ScreenView style={styles.container}>
      <List.Section style={styles.column}>
        <List.Subheader>
          {t('settings.bugReport.descriptionLabel')}
        </List.Subheader>
        <TextInput
          mode='outlined'
          value={bugDescription}
          onChangeText={setBugDescription}
          placeholder={t('settings.bugReport.descriptionPlaceholder')}
          multiline
          style={{ height: 200 }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>{t('settings.bugReport.emailLabel')}</List.Subheader>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={t('settings.bugReport.emailPlaceholder')}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </List.Section>

      <List.Section>
        <List.Subheader>
          {t('settings.bugReport.screenshotLabel')}
        </List.Subheader>
        <Button onPress={pickImage}>
          {t('settings.bugReport.attachScreenshot')}
        </Button>
        {image && (
          <View style={styles.imageBox}>
            <Image source={{ uri: image }} />
            <Button onPress={() => setImage(null)}>
              {t('settings.bugReport.deleteImage')}
            </Button>
          </View>
        )}
      </List.Section>

      <Button onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting
          ? t('settings.bugReport.submitting')
          : t('settings.bugReport.submitButton')}
      </Button>
    </ScreenView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
