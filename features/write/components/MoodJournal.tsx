import { ActionButtons } from '@/features/write/components/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components/EnhancedTextInput'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { DelayMS } from '@/shared/constants'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { YStack } from 'tamagui'

export const MoodJournal = () => {
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
    <YStack gap='$4' flex={1}>
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
    </YStack>
  )
}
