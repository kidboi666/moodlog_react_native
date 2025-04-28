import { ActionButtons } from '@/features/write/components/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components/EnhancedTextInput'
import { useDraftManage } from '@/features/write/hooks'
import { DelayMS, Layout } from '@/shared/constants'
import { MoodLevel } from '@/shared/types'
import { useCallback, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { BottomSheetContainer } from '../../BottomSheetContainer'

type Props = {
  onSubmit: () => void
  selectedMoodId?: string
  moodLevel?: string
}

export const WriteJournalModal = ({
  onSubmit,
  selectedMoodId = '',
  moodLevel = MoodLevel.HALF,
}: Props) => {
  // 선택된 감정 정보를 사용하여 초기화
  const { onContentChange, onImageUriChange, draft } = useDraftManage(
    selectedMoodId, // props로 전달된 선택된 감정 ID 사용
    (moodLevel as MoodLevel) || MoodLevel.HALF, // props로 전달된 감정 레벨 사용
  )
  const inputRef = useRef<EnhancedTextInputRef>(null)

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime()
  }, [])

  useEffect(() => {
    // 모달이 열릴 때 입력창에 포커스
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
          isSubmitted={false}
          onTimeStamp={handleTimeStamp}
          onImageUriChange={onImageUriChange}
          content={draft.content}
          onSubmit={onSubmit}
        />
      </KeyboardAvoidingView>
    </BottomSheetContainer>
  )
}
