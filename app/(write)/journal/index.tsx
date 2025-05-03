import { Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

import { JournalMenuSelector, MoodLevelForm } from '@/features/mood/components'
import { EmptyMoodView, MainRecordFlow } from '@/features/write/components'
import { useAddJournal } from '@/features/write/hooks'
import {
  Delay,
  HeaderContent,
  StepDot,
  ViewContainer,
} from '@/shared/components'
import { ImageService } from '@/shared/services'
import { useMood } from '@/shared/store'
import { Draft, MoodLevel } from '@/shared/types'

export default function WriteJournalScreen() {
  const router = useRouter()
  const moods = useMood(state => state.moods)
  const moodLength = Object.keys(moods).length

  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      id: Object.keys(moods)[0] || '',
      level: MoodLevel.HALF,
    },
    imageUri: [],
  })

  const [[page, totalPage], setPage] = useState([0, moodLength])

  const { onSubmit } = useAddJournal({
    draftContent: draft.content,
    draftImageUri: draft.imageUri,
    draftMoodId: draft.mood.id,
    draftMoodLevel: draft.mood.level,
  })

  const handleMoodChange = useCallback((moodId: string) => {
    setDraft(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        id: moodId,
      },
    }))
  }, [])

  const handleMoodLevelChange = useCallback((level: MoodLevel) => {
    setDraft(prev => ({
      ...prev,
      mood: {
        ...prev.mood,
        level,
      },
    }))
  }, [])

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

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({
      ...prev,
      content,
    }))
  }, [])

  const handleImageUriRemove = useCallback(
    (imageUris: string[], index: number) => {
      const newImageUris = [...imageUris]
      newImageUris.splice(index, 1)
      setDraft(prev => ({
        ...prev,
        imageUri: newImageUris,
      }))
    },
    [],
  )

  useEffect(() => {
    const newTotalPage = Object.keys(moods).length
    setPage(prev => [prev[0] < newTotalPage ? prev[0] : 0, newTotalPage])

    if (newTotalPage > 0 && !draft.mood.id) {
      handleMoodChange(Object.keys(moods)[0])
    }
  }, [moods, handleMoodChange])

  const selectedMoodColor = useMemo(
    () => draft.mood.id && moods[draft.mood.id]?.color,
    [draft.mood.id, moods],
  )

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
        style={styles.keyboardAvoidingViewContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <MainRecordFlow
          draft={draft}
          moods={moods}
          page={page}
          totalPage={totalPage}
          selectedMoodId={draft.mood.id}
          setPage={setPage}
          setSelectedMoodId={handleMoodChange}
          onImageUriRemove={handleImageUriRemove}
          onContentChange={handleContentChange}
          onImageUriChange={handleImageUriChange}
        />
        <MoodLevelForm
          moodColor={selectedMoodColor}
          moodLevel={draft.mood.level}
          onMoodLevelChange={handleMoodLevelChange}
        />
      </KeyboardAvoidingView>
      <JournalMenuSelector />
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
})
