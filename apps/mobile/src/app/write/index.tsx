import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Form, XStack, useTheme } from 'tamagui'

import { ActionButtons } from '@/core/components/modals/contents/JournalWriteModal/components/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/core/components/modals/contents/JournalWriteModal/components/EnhancedTextInput'
import { KEYBOARD_VERTICAL_OFFSET } from '@/core/constants/size'
import { moodTheme } from '@/core/constants/themes'
import { ImageHelper } from '@/core/services/image-helper.service'
import * as S from '@/styles/screens/write/Write.styled'
import type { Draft } from '@/types/journal.types'
import type { MoodLevel, MoodType } from '@/types/mood.types'

interface Props {
  moodType: MoodType
  moodLevel: MoodLevel
  isLoading: boolean
  isSubmitted: boolean
  onSubmit: (draft: Draft) => void
}

export default function Screen({
  moodType,
  moodLevel,
  isLoading,
  isSubmitted,
  onSubmit,
}: Props) {
  const theme = useTheme()
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      type: moodType,
      level: moodLevel,
    },
    imageUri: [],
  })
  const inputRef = useRef<EnhancedTextInputRef>(null)

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }))
  }, [])

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await ImageHelper.createNewFileName()

      setDraft(prev =>
        newFilePath
          ? { ...prev, imageUri: [...prev.imageUri, newFilePath] }
          : prev,
      )
    } catch (err) {
      console.error('Image saving error ', err)
      return null
    }
  }, [])

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime()
  }, [inputRef])

  const contentContainerStyle = useMemo(
    () => ({
      backgroundColor: theme.red5.val,
      flex: 1,
    }),
    [theme.red5.val],
  )

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }, [])

  return (
    <S.BottomSheetContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <S.XStackContainer>
          <Form flex={1} gap='$4' onSubmit={() => onSubmit(draft)}>
            <S.InputContainer>
              {draft.mood ? (
                <S.ColoredMoodBar
                  moodColor={moodTheme[draft.mood.type][draft.mood.level]}
                />
              ) : (
                <S.UncoloredMoodBar />
              )}
              <EnhancedTextInput
                ref={inputRef}
                imageUri={draft.imageUri}
                contentValue={draft.content}
                onContentChange={handleContentChange}
              />
            </S.InputContainer>
            <S.ButtonsViewBox>
              <ActionButtons
                isSubmitted={isSubmitted}
                isLoading={isLoading}
                onTimeStamp={handleTimeStamp}
                onImageUriChange={handleImageUriChange}
                content={draft.content}
              />
            </S.ButtonsViewBox>
          </Form>
        </S.XStackContainer>
      </KeyboardAvoidingView>
    </S.BottomSheetContainer>
  )
}
