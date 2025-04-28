import { ActionButtons } from '@/features/write/components/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components/EnhancedTextInput'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { DelayMS } from '@/shared/constants'
import { MoodLevel } from '@/shared/types'
import { useCallback, useEffect, useRef } from 'react'
import { YStack } from 'tamagui'

interface Props {
  moodName: string
  moodLevel: MoodLevel
  show: boolean
}

export const MoodJournal = ({ moodName, moodLevel, show }: Props) => {
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
    if (!show) {
      return
    }

    const focusTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }, DelayMS.ROUTE)

    return () => clearTimeout(focusTimer)
  }, [])

  if (!show) {
    return null
  }

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
