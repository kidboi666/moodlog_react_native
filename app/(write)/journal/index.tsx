import { Check } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useEffect, useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Spinner, styled } from 'tamagui'

import { JournalMenuSelector, MoodLevelForm } from '@/features/mood/components'
import { MoodService } from '@/features/mood/services'
import { EmptyMoodView, MainRecordFlow } from '@/features/write/components'
import { useAddJournal, useJournalDraftForm } from '@/features/write/hooks'
import { HeaderContent, StepDot, ViewContainer } from '@/shared/components'
import { Mood } from '@/shared/types'

export default function WriteJournalScreen() {
  const router = useRouter()
  const db = useSQLiteContext()
  const moodService = new MoodService(db)
  const {
    draft,
    onContentChange,
    onMoodLevelChange,
    onMoodIdChange,
    onImageUriChange,
    onImageUriRemove,
    onIsLoadingChange,
    isLoading,
  } = useJournalDraftForm()
  const { onSubmit } = useAddJournal(draft)
  const [moods, setMoods] = useState<Mood[]>([])
  const [[page, totalPage], setPage] = useState([0, moods.length])

  useEffect(() => {
    const newTotalPage = moods.length
    setPage(prev => [prev[0] < newTotalPage ? prev[0] : 0, newTotalPage])

    if (newTotalPage > 0 && !draft.mood.id) {
      onMoodIdChange(moods[0].id)
    }
  }, [moods, onMoodIdChange])

  const selectedMoodColor = useMemo(
    () => draft.mood.id && moods.find(mood => mood.id === draft.mood.id)?.color,
    [draft.mood.id, moods],
  )

  useEffect(() => {
    const getMoods = async () => {
      try {
        onIsLoadingChange(true)
        const moods = await moodService.getMoods()
        if (moods) {
          setMoods(moods)
        }
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message)
        }
      } finally {
        onIsLoadingChange(false)
      }
    }

    getMoods()
  }, [])

  if (isLoading) {
    return (
      <Container Header={<HeaderContent leftAction={() => router.back()} />}>
        <Spinner size='large' />
      </Container>
    )
  }

  if (Object.keys(moods).length === 0) {
    return (
      <Container Header={<HeaderContent leftAction={() => router.back()} />}>
        <EmptyMoodView />
      </Container>
    )
  }

  return (
    <Container
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
          onMoodChange={onMoodIdChange}
          onImageUriRemove={onImageUriRemove}
          onContentChange={onContentChange}
          onImageUriChange={onImageUriChange}
        />
        <MoodLevelForm
          moodColor={selectedMoodColor}
          moodLevel={draft.mood.level}
          onMoodLevelChange={onMoodLevelChange}
        />
      </KeyboardAvoidingView>
      <JournalMenuSelector />
    </Container>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
})

const Container = styled(ViewContainer, {
  edges: ['bottom'],
  gap: '$4',
  variants: {
    isLeftSpacing: {
      true: { px: 0 },
    },
  } as const,
})
