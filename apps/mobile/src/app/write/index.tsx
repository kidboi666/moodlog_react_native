import { useToastController } from '@tamagui/toast'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Form, useTheme } from 'tamagui'

import { ActionButtons } from '@/core/components/features/write/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/core/components/features/write/EnhancedTextInput'
import { KEYBOARD_VERTICAL_OFFSET } from '@/core/constants/size'
import { moodTheme } from '@/core/constants/themes'
import { ImageHelper } from '@/core/services/image-helper.service'
import { useJournal } from '@/core/store/journal.store'
import { useUI } from '@/core/store/ui.store'
import * as S from '@/styles/screens/write/Write.styled'
import type { Draft } from '@/types/journal.types'
import type { MoodLevel, MoodType } from '@/types/mood.types'

export default function Screen() {
  const { moodType, moodLevel } = useLocalSearchParams()
  const router = useRouter()
  const toast = useToastController()
  const { t } = useTranslation()
  const theme = useTheme()
  const addJournal = useJournal(state => state.addJournal)
  const isLoading = useUI(state => state.isLoading)
  const setLoading = useUI(state => state.setLoading)
  const setNavigating = useUI(state => state.setNavigating)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      type: moodType as MoodType,
      level: moodLevel as MoodLevel,
    },
    imageUri: [],
  })
  const inputRef = useRef<EnhancedTextInputRef>(null)

  const handleSubmit = useCallback(
    async (draft: Draft) => {
      try {
        setLoading(true)
        await addJournal(draft)
        toast.show(t('notifications.success.journal.title'), {
          message: t('notifications.success.journal.message'),
          preset: 'success',
        })
        setIsSubmitted(true)
        setNavigating(true)
        Keyboard.dismiss()

        setTimeout(() => {
          router.replace('/(tabs)')
          setTimeout(() => {
            setNavigating(false)
          }, 100)
        }, 300)
      } catch (error) {
        console.error('일기 저장 실패:', error)
        toast.show('저장 실패', {
          preset: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [toast, addJournal, t, router, setNavigating, setLoading],
  )

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
    <S.ViewContainer edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <S.XStackContainer>
          <Form flex={1} gap='$4' onSubmit={() => handleSubmit(draft)}>
            <S.InputContainer>
              {draft.mood ? (
                <S.ColoredMoodBar
                  moodColor={moodTheme[draft.mood.type]?.[draft.mood.level]}
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
    </S.ViewContainer>
  )
}
