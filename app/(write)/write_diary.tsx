import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { YStack } from 'tamagui'

import {
  ActionButtons,
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/features/write/components'
import { useAddJournal, useDraftManage } from '@/features/write/hooks'
import { HeaderContent, ViewContainer } from '@/shared/components'
import { ROUTE_DELAY_MS } from '@/shared/constants'

export default function WriteDiaryScreen() {
  const router = useRouter()
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
    }, ROUTE_DELAY_MS)

    return () => clearTimeout(focusTimer)
  }, [])

  return (
    <ViewContainer
      edges={['bottom']}
      Header={<HeaderContent leftAction={() => router.back()} />}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      >
        <YStack flex={1} gap='$4'>
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
      </KeyboardAvoidingView>
    </ViewContainer>
  )
}
