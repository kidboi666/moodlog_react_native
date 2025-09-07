import { useDraft } from '@/src/data/store'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

export function useDiaryEditor() {
  const {
    draft,
    onContentChange,
    onAddImage,
    onAiResponseChange,
    onRemoveImage,
  } = useDraft()
  const { t } = useTranslation()

  const handleImagePress = useCallback(
    (index: number) => {
      Alert.alert(
        t('write.dialog.deleteImage.title'),
        t('write.dialog.deleteImage.description'),
        [
          {
            text: t('common.cancel'),
            style: 'cancel',
          },
          {
            text: t('common.delete'),
            style: 'destructive',
            onPress: () => onRemoveImage(draft.imageUri, index),
          },
        ],
        { cancelable: true },
      )
    },
    [draft.imageUri, onRemoveImage],
  )

  return {
    content: draft.content,
    imageUri: draft.imageUri,
    aiResponseEnabled: draft.aiResponseEnabled,
    onContentChange: onContentChange,
    onAddImage,
    onAiResponseChange: onAiResponseChange,
    onRemoveImage: handleImagePress,
  }
}
