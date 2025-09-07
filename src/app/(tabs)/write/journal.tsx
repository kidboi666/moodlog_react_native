import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import { useDraft } from '@/src/data/store'
import {
  AiResponseToggle,
  CoverImagePicker,
} from '@/src/features/write/components'
import { useDiaryEditor } from '@/src/features/write/hooks/useDiaryEditor'
import { ScreenView } from '@/src/shared/components'

export default function WriteJournalScreen() {
  const { t } = useTranslation()
  const {
    content,
    imageUri,
    aiResponseEnabled,
    onContentChange,
    onAddImage,
    onAiResponseChange,
    onRemoveImage,
  } = useDiaryEditor()

  return (
    <ScreenView>
      <View style={styles.container}>
        <CoverImagePicker
          imageUri={imageUri}
          onRemoveImage={onRemoveImage}
          onAddImage={onAddImage}
        />
        <TextInput
          multiline
          label={t('common.content')}
          textAlignVertical='top'
          value={content}
          onChangeText={onContentChange}
          placeholder={t('placeholders.journal.content')}
          style={styles.textarea}
        />
        <AiResponseToggle
          enabled={aiResponseEnabled}
          onToggle={onAiResponseChange}
        />
      </View>
    </ScreenView>
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
