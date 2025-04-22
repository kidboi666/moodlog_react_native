import { useToastController } from '@tamagui/toast'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AppState,
  AppStateStatus,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { GetThemeValueForKey, View, XStack } from 'tamagui'

import { KEYBOARD_VERTICAL_OFFSET } from '@/constants'
import { ImageHelper } from '@/services'
import { useDraft, useJournal, useUI } from '@/store'
import { type Draft, MoodLevel } from '@/types'

import { ActionButtons } from '@/components/features/write/ActionButtons'
import {
  EnhancedTextInput,
  type EnhancedTextInputRef,
} from '@/components/features/write/EnhancedTextInput'
import { ViewContainer } from '@/components/shared/ViewContainer'

const AUTO_SAVE_INTERVAL = 5000

export default function WriteDiaryScreen() {
  const { moodName, moodLevel, moodColor } = useLocalSearchParams()
  const router = useRouter()
  const { t } = useTranslation()
  const toast = useToastController()

  const addJournal = useJournal(state => state.addJournal)
  const isLoading = useUI(state => state.isLoading)
  const setLoading = useUI(state => state.setLoading)
  const setNavigating = useUI(state => state.setNavigating)
  const storedDraft = useDraft(state => state.draft)
  const setStoredDraft = useDraft(state => state.setDraft)
  const removeStoredDraft = useDraft(state => state.removeDraft)

  const inputRef = useRef<EnhancedTextInputRef>(null)
  const lastSavedContentRef = useRef<string>('')
  const shouldSaveRef = useRef(false)
  const initialLoadCompletedRef = useRef(false)
  const isUpdatingDraftRef = useRef(false)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      id: (moodName as string) || '',
      name: moodName as string,
      color: moodColor as string,
      level: moodLevel as MoodLevel,
      createdAt: new Date().toISOString(),
    },
    imageUri: [],
  })

  const saveDraft = useCallback(() => {
    if (!shouldSaveRef.current || isUpdatingDraftRef.current) return

    try {
      setStoredDraft(draft)
      lastSavedContentRef.current = draft.content
      shouldSaveRef.current = false
    } catch (error) {
      console.error('자동 저장 실패:', error)
    }
  }, [draft, setStoredDraft])

  const handleContentChange = useCallback((content: string) => {
    if (isUpdatingDraftRef.current) return

    setDraft(prev => ({ ...prev, content }))
  }, [])

  const handleImageUriChange = useCallback(async () => {
    if (isUpdatingDraftRef.current) return

    try {
      const newFilePath = await ImageHelper.createNewFileName()
      if (newFilePath) {
        setDraft(prev => ({
          ...prev,
          imageUri: [...prev.imageUri, newFilePath],
        }))
      }
    } catch (err) {
      console.error('이미지 저장 오류:', err)
    }
  }, [])

  const handleImagesChange = useCallback((imageUri: string[]) => {
    if (isUpdatingDraftRef.current) return

    setDraft(prev => ({ ...prev, imageUri }))
  }, [])

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime()
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!draft.content.trim()) {
      toast.show('내용을 입력해주세요', { preset: 'notice' })
      return
    }

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
        setTimeout(() => setNavigating(false), 100)
      }, 300)
    } catch (error: any) {
      const errorMessage =
        error.message === 'daily_journal_limit_exceeded'
          ? t('notifications.warning.dailyLimit.message')
          : '저장에 실패했습니다'

      const errorTitle =
        error.message === 'daily_journal_limit_exceeded'
          ? t('notifications.warning.dailyLimit.title')
          : '저장 실패'

      toast.show(errorTitle, {
        message: errorMessage,
        preset: 'error',
      })
      console.error('일기 저장 실패:', error)
    } finally {
      setLoading(false)
    }
  }, [
    draft,
    toast,
    addJournal,
    t,
    router,
    setNavigating,
    setLoading,
    removeStoredDraft,
  ])

  // =========== 초기 데이터 로딩 ===========
  useEffect(() => {
    if (
      !initialLoadCompletedRef.current &&
      storedDraft?.content &&
      !draft.content
    ) {
      isUpdatingDraftRef.current = true
      setDraft(prevDraft => ({
        ...prevDraft,
        content: storedDraft.content,
        imageUri: storedDraft.imageUri || prevDraft.imageUri,
        mood: storedDraft.mood || prevDraft.mood,
      }))
      lastSavedContentRef.current = storedDraft.content

      setTimeout(() => {
        toast.show('이전 작성 내용', {
          message: '이전에 작성 중이던 내용을 불러왔습니다.',
          preset: 'success',
        })
        isUpdatingDraftRef.current = false
      }, 0)
    }

    initialLoadCompletedRef.current = true
  }, [storedDraft?.content])

  // =========== 자동 저장 로직 ===========
  useEffect(() => {
    if (!initialLoadCompletedRef.current || isUpdatingDraftRef.current) return

    if (lastSavedContentRef.current !== draft.content) {
      shouldSaveRef.current = true

      if (!draft.content) {
        removeStoredDraft()
        console.log('내용을 지워 저장된 초안 삭제')
      }
    }
  }, [draft.content, removeStoredDraft])

  // 자동 저장 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      if (shouldSaveRef.current && !isUpdatingDraftRef.current) {
        saveDraft()
      }
    }, AUTO_SAVE_INTERVAL)

    return () => {
      clearInterval(timer)
      if (!isUpdatingDraftRef.current) {
        saveDraft() // 컴포넌트 언마운트 시 저장
      }
    }
  }, [saveDraft])

  // 앱 상태 변경 시 저장
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (!isUpdatingDraftRef.current) {
          saveDraft()
        }
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )
    return () => subscription.remove()
  }, [saveDraft])

  // 초기 포커스 설정
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }, 300)

    return () => clearTimeout(focusTimer)
  }, [])

  return (
    <ViewContainer edges={['bottom']} pl={0}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <View flex={1} gap='$4'>
          <XStack flex={1} gap='$4'>
            <View
              width='3%'
              borderTopRightRadius='$4'
              borderBottomRightRadius='$4'
              bg={moodColor as GetThemeValueForKey<'backgroundColor'>}
            />
            <EnhancedTextInput
              ref={inputRef}
              imageUri={draft.imageUri}
              contentValue={draft.content}
              onContentChange={handleContentChange}
              onImageUriChange={handleImagesChange}
            />
          </XStack>

          <ActionButtons
            isSubmitted={isSubmitted}
            isLoading={isLoading}
            onTimeStamp={handleTimeStamp}
            onImageUriChange={handleImageUriChange}
            content={draft.content}
            onSubmit={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </ViewContainer>
  )
}
