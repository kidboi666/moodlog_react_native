import { ActionButtons } from '@/features/write/components/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components/EnhancedTextInput'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { DelayMS, Layout } from '@/shared/constants'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { BottomSheetContainer } from '../../BottomSheetContainer'

export const WriteJournalModal = () => {
  const { moodName, moodLevel } = useLocalSearchParams<{
    moodName: string
    moodLevel: string
  }>()
  const { onContentChange, onImageUriChange, draft } = useDraftManage(
    moodName,
    moodLevel,
  )
  const { onSubmit, isSubmitted } = useAddJournal(draft)
  const inputRef = useRef<EnhancedTextInputRef>(null)

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime()
  }, [])

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }, DelayMS.ROUTE)

    return () => clearTimeout(focusTimer)
  }, [])
  return (
    <BottomSheetContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={Layout.HEIGHT.KEYBOARD_VERTICAL_OFFSET}
      >
        <EnhancedTextInput
          ref={inputRef}
          imageUri={draft.imageUri}
          contentValue={draft.content}
          onContentChange={onContentChange}
          onImageUriChange={onImageUriChange}
        />

        <ActionButtons
          isSubmitted={isSubmitted}
          onTimeStamp={handleTimeStamp}
          onImageUriChange={onImageUriChange}
          content={draft.content}
          onSubmit={onSubmit}
        />
      </KeyboardAvoidingView>
    </BottomSheetContainer>
  )
}
