import { useCallback, useEffect, useRef, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

import { ImageService } from '@/shared/services'
import { useDraft } from '@/shared/store'
import { Draft, MoodLevel } from '@/shared/types'
import { useToastController } from '@tamagui/toast'

const AUTO_SAVE_INTERVAL = 5000

export const useDraftManage = (moodName: string, moodLevel: string) => {
  const toast = useToastController()
  const storedDraft = useDraft(state => state.draft)
  const setStoredDraft = useDraft(state => state.setDraft)
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      id: moodName,
      level: moodLevel as MoodLevel,
    },
    imageUri: [],
  })
  const lastSavedContentRef = useRef<string>('')
  const shouldSaveRef = useRef(false)
  const initialLoadCompletedRef = useRef(false)
  const isUpdatingDraftRef = useRef(false)

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
      const newFilePath = await ImageService.createNewFileName()
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

  useEffect(() => {
    if (!initialLoadCompletedRef.current || isUpdatingDraftRef.current) return

    if (lastSavedContentRef.current !== draft.content) {
      shouldSaveRef.current = true

      if (!draft.content) {
        useDraft.persist.clearStorage()
        console.log('내용을 지워 저장된 초안 삭제')
      }
    }
  }, [draft.content])

  return {
    onContentChange: handleContentChange,
    onImageUriChange: handleImageUriChange,
    draft,
    lastSavedContent: lastSavedContentRef.current,
    shouldSave: shouldSaveRef.current,
  }
}
