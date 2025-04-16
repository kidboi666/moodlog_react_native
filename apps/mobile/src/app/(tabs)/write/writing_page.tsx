import { useToastController } from '@tamagui/toast'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AppState,
  AppStateStatus,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Form, useTheme } from 'tamagui'

import { ActionButtons } from '@/core/components/features/write/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/core/components/features/write/EnhancedTextInput'
import { WriteHeader } from '@/core/components/features/write/WriteHeader'
import { KEYBOARD_VERTICAL_OFFSET } from '@/core/constants/size'
import { moodTheme } from '@/core/constants/themes'
import { ImageHelper } from '@/core/services/image-helper.service'
import { useDraft } from '@/core/store/draft.store'
import { useJournal } from '@/core/store/journal.store'
import { useUI } from '@/core/store/ui.store'
import * as S from '@/styles/screens/write/Write.styled'
import type { Draft } from '@/types/journal.types'
import type { MoodLevel, MoodType } from '@/types/mood.types'

// 자동 저장 간격 (밀리초)
const AUTO_SAVE_INTERVAL = 5000

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
  const lastSavedContentRef = useRef<string>('')
  const shouldSaveRef = useRef(false)
  const initialLoadCompletedRef = useRef(false)

  const storedDraft = useDraft(state => state.draft)
  const setStoredDraft = useDraft(state => state.setDraft)
  const removeStoredDraft = useDraft(state => state.removeDraft)

  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      type: moodType as MoodType,
      level: moodLevel as MoodLevel,
    },
    imageUri: [],
  })

  const inputRef = useRef<EnhancedTextInputRef>(null)

  useEffect(() => {
    if (
      initialLoadCompletedRef.current &&
      lastSavedContentRef.current !== draft.content
    ) {
      shouldSaveRef.current = true

      if (!draft.content) {
        removeStoredDraft()
        console.log('내용을 지워 저장된 초안 삭제')
      }
    }
  }, [draft, removeStoredDraft])

  const saveDraft = useCallback(() => {
    if (!shouldSaveRef.current) return

    try {
      setStoredDraft(draft)
      lastSavedContentRef.current = draft.content
      shouldSaveRef.current = false
      console.log('임시 저장 완료:', new Date().toLocaleTimeString())
    } catch (error) {
      console.error('자동 저장 실패:', error)
    }
  }, [draft, setStoredDraft])

  useEffect(() => {
    const timer = setInterval(() => {
      if (shouldSaveRef.current) {
        saveDraft()
      }
    }, AUTO_SAVE_INTERVAL)

    return () => {
      clearInterval(timer)
      if (shouldSaveRef.current) {
        saveDraft()
      }
    }
  }, [saveDraft])

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          if (shouldSaveRef.current) {
            saveDraft()
          }
        }
      },
    )

    return () => {
      appStateSubscription.remove()
    }
  }, [saveDraft])

  useEffect(() => {
    if (initialLoadCompletedRef.current) return

    if (storedDraft?.content && !draft.content) {
      setDraft(prevDraft => ({
        ...prevDraft,
        content: storedDraft.content,
        imageUri: storedDraft.imageUri || prevDraft.imageUri,
        mood: storedDraft.mood || prevDraft.mood,
      }))
      lastSavedContentRef.current = storedDraft.content
      toast.show('이전 작성 내용', {
        message: '이전에 작성 중이던 내용을 불러왔습니다.',
        preset: 'success',
      })
    }

    initialLoadCompletedRef.current = true
  }, [storedDraft, toast, draft.content])

  const handleSubmit = useCallback(
    async (draft: Draft) => {
      try {
        setLoading(true)
        await addJournal(draft)
        removeStoredDraft()
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
    [
      toast,
      addJournal,
      t,
      router,
      setNavigating,
      setLoading,
      removeStoredDraft,
    ],
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

  const handleImagesChange = useCallback((imageUri: string[]) => {
    setDraft(prev => ({ ...prev, imageUri }))
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
    <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
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
                onImageUriChange={handleImagesChange}
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
