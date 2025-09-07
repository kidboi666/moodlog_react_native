import { useDraft } from '@/src/data/store'
import { useCallback } from 'react'
import { Alert } from 'react-native'

export function useDiaryEditor() {
  const {
    draft,
    onContentChange,
    onAddImage,
    onAiResponseChange,
    onRemoveImage,
  } = useDraft()

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
