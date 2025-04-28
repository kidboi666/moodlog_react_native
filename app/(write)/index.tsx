import { Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { FormSectionFromChooseMoodScreen } from '@/features/mood/components'
import {
  BottomUiFlow,
  EmptyMoodView,
  MainRecordFlow,
} from '@/features/write/components'
import { useAddJournal } from '@/features/write/hooks'
import { StepProgressProvider } from '@/providers'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { ImageService } from '@/shared/services'
import { useMood } from '@/shared/store'
import { Draft, MoodLevel } from '@/shared/types'

export default function WriteScreen() {
  const router = useRouter()
  const moods = useMood(state => state.moods)
  const moodLength = Object.keys(moods).length
  const [moodLevel, setMoodLevel] = useState<MoodLevel>(MoodLevel.HALF)
  const [[page, totalPage], setPage] = useState([0, moodLength])
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      id: Object.keys(moods)[0] || '',
      level: moodLevel as MoodLevel,
    },
    imageUri: [],
  })
  const { onSubmit } = useAddJournal({
    draftContent: draft.content,
    draftImageUri: draft.imageUri,
    draftMoodId: draft.mood.id,
    draftMoodLevel: draft.mood.level,
  })

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }))
  }, [])

  const handleMoodChange = useCallback((moodId: string) => {
    setDraft(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        id: moodId,
      },
    }))
  }, [])

  const handleImageUriRemove = useCallback(
    (imageUri: string[], index: number) => {
      const newImageUri = [...imageUri]
      newImageUri.splice(index, 1)
      setDraft(prev => ({
        ...prev,
        imageUri: newImageUri,
      }))
    },
    [],
  )

  const handleImageUriChange = useCallback(async () => {
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
    const newTotalPage = Object.keys(moods).length
    setPage(prev => [prev[0] < newTotalPage ? prev[0] : 0, newTotalPage])

    if (newTotalPage > 0 && !draft.mood.id) {
      handleMoodChange(Object.keys(moods)[0])
    }
  }, [moods, handleMoodChange])

  if (moodLength === 0) {
    return (
      <Delay flex={1}>
        <ViewContainer
          edges={['bottom']}
          gap='$4'
          Header={<HeaderContent leftAction={() => router.back()} />}
        >
          <EmptyMoodView />
        </ViewContainer>
      </Delay>
    )
  }

  return (
    <StepProgressProvider totalSteps={3}>
      <ViewContainer
        edges={['bottom']}
        gap='$4'
        px={0}
        Header={
          <HeaderContent
            leftAction={() => router.back()}
            rightAction={onSubmit}
            rightActionIcon={Check}
            rightActionDisabled={!draft.content || !draft.mood.id}
          >
            <StepDot />
          </HeaderContent>
        }
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <MainRecordFlow
            moods={moods}
            totalPage={totalPage}
            page={page}
            setPage={setPage}
            setSelectedMoodId={handleMoodChange}
          />
          <BottomUiFlow
            page={page}
            setPage={setPage}
            totalPage={totalPage}
            draft={draft}
            moods={moods}
            moodLevel={moodLevel}
            setMoodLevel={setMoodLevel}
            selectedMoodId={draft.mood.id}
            onImageUriRemove={handleImageUriRemove}
            onContentChange={handleContentChange}
            onImageUriChange={handleImageUriChange}
          />
        </KeyboardAvoidingView>
        <FormSectionFromChooseMoodScreen selectedMoodId={draft.mood.id} />
      </ViewContainer>
    </StepProgressProvider>
  )
}
