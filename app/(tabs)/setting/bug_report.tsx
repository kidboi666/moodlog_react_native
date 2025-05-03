import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Image, ScrollView, XStack, YStack, styled } from 'tamagui'

import {
  FormInput,
  FormInputArea,
  H1,
  H4,
  PressableButton,
  ViewContainer,
} from '@/shared/components'

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
      <Container>
        <TitleXStack>
          <H1>{t('settings.bugReport.title')}</H1>
        </TitleXStack>

        <SpacingYStack>
          <H4>{t('settings.bugReport.descriptionLabel')}</H4>
          <FormInputArea
            value={bugDescription}
            onChangeText={setBugDescription}
            placeholder={t('settings.bugReport.descriptionPlaceholder')}
            height={150}
            autoCapitalize='none'
          />
        </SpacingYStack>

        <SpacingYStack>
          <H4>{t('settings.bugReport.emailLabel')}</H4>
          <FormInput
            value={email}
            onChangeText={setEmail}
            placeholder={t('settings.bugReport.emailPlaceholder')}
            autoCapitalize='none'
            keyboardType='email-address'
          />
        </SpacingYStack>

        <SpacingYStack>
          <H4>{t('settings.bugReport.screenshotLabel')}</H4>
          <PressableButton onPress={pickImage}>
            {t('settings.bugReport.attachScreenshot')}
          </PressableButton>
          {image && (
            <ImageYStack>
              <StyledImage source={{ uri: image }} />
              <PressableButton onPress={() => setImage(null)}>
                {t('settings.bugReport.deleteImage')}
              </PressableButton>
            </ImageYStack>
          )}
        </SpacingYStack>

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
      </Container>
    </ScrollView>
  )
}

const Container = styled(ViewContainer, {
  edges: ['bottom'],
  padded: true,
  flexDirection: 'column',
  gap: '$4',
})

const TitleXStack = styled(XStack, {
  items: 'center',
  gap: '$2',
})

const SpacingYStack = styled(YStack, {
  gap: '$2',
})

const ImageYStack = styled(YStack, {
  mt: '$2',
  items: 'center',
  gap: '$2',
})

const StyledImage = styled(Image, {
  width: 200,
  height: 200,
})
