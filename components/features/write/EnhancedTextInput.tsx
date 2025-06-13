import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { IconButton, TextInput, useTheme } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { AiResponseToggle } from './AiResponseToggle'

interface Props {
  imageUri: string[]
  contentValue: string
  onContentChange: (content: string) => void
  autoFocus?: boolean
  onSubmit: () => void
  onAiResponseChange: (aiResponseEnabled: boolean) => void
  aiResponseEnabled: boolean
  onImageUriChange: () => void
  onImageUriRemove: (imageUri: string[], index: number) => void
}

export function EnhancedTextInput({
  contentValue,
  onContentChange,
  onSubmit,
  imageUri,
  aiResponseEnabled,
  onAiResponseChange,
  onImageUriChange,
  onImageUriRemove,
}: Props) {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleContentChange = useCallback((text: string) => {
    onContentChange(text)
  }, [])

  const handleImagePress = useCallback(
    (index: number) => {
      Alert.alert(
        '이미지 삭제',
        '이 이미지를 삭제하시겠습니까?',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '삭제',
            style: 'destructive',
            onPress: () => {
              onImageUriRemove(imageUri, index)
              Toast.show({
                text1: '이미지 삭제',
                text2: '이미지가 삭제되었습니다.',
                type: 'success',
              })
            },
          },
        ],
        { cancelable: true },
      )
    },
    [imageUri, onImageUriChange],
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {imageUri.map((uri, index) => (
          <TouchableOpacity key={uri} onPress={() => handleImagePress(index)}>
            <Image style={styles.image} source={{ uri }} />
          </TouchableOpacity>
        ))}
        {imageUri.length < 3 && (
          <TouchableOpacity
            onPress={onImageUriChange}
            style={[styles.emptyImage, { borderColor: theme.colors.outline }]}
          >
            <MaterialCommunityIcons
              name='file-image-plus-outline'
              size={40}
              color={theme.colors.outline}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
      <TextInput
        multiline
        label={t('common.content')}
        textAlignVertical='top'
        value={contentValue}
        onChangeText={handleContentChange}
        placeholder={t('placeholders.journal.content')}
        style={styles.textarea}
      />
      <AiResponseToggle
        enabled={aiResponseEnabled}
        onToggle={onAiResponseChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  scrollView: {
    gap: 16,
  },
  emptyImage: {
    height: 80,
    width: 80,
    borderRadius: 16,
    borderWidth: 1,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  textarea: {
    height: 200,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
