import { useCallback, useEffect, useRef } from 'react'
import { YStack } from 'tamagui'

import {
  ActionButtons,
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components'
import { DelayMS } from '@/shared/constants'
import { useStepProgress } from '@/shared/store'
import { Draft } from '@/shared/types'

interface Props {
  onImageUriRemove: (imageUri: string[], index: number) => void
  onContentChange: (content: string) => void
  onImageUriChange: () => void
  draft: Draft
  show: boolean
}

export const MoodJournalForm = ({
  onImageUriRemove,
  onContentChange,
  onImageUriChange,
  draft,
  show,
}: Props) => {
  const {
    state: { currentStep },
  } = useStepProgress()
  const inputRef = useRef<EnhancedTextInputRef>(null)

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime()
  }, [])

  useEffect(() => {
    if (!show) {
      return
    }
    let focusTimer: NodeJS.Timeout

    if (currentStep === 2) {
      focusTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          inputRef.current?.focus()
        })
      }, DelayMS.ROUTE)
    }

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
        onImageUriRemove={onImageUriRemove}
        onContentChange={onContentChange}
        onImageUriChange={onImageUriChange}
      />

      <ActionButtons
        onTimeStamp={handleTimeStamp}
        onImageUriChange={onImageUriChange}
      />
    </YStack>
  )
}
