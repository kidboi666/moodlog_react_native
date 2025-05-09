import { Check } from '@tamagui/lucide-icons'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useMemo } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Spinner, styled } from 'tamagui'

import { JournalMenuSelector, MoodLevelForm } from '@/components/features/mood'
import { EmptyMoodView, MainRecordFlow } from '@/components/features/write'
import { HeaderContent, StepDot, ViewContainer } from '@/components/shared'
import { useAddJournal, useJournalDraftForm } from '@/hooks'
import { MoodService } from '@/services'

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
  const {
    data: moods,
    error,
    isPending,
  } = useQuery({
    queryKey: ['moods'],
    queryFn: () => moodService.getMoods(),
  })

  const selectedMoodColor = useMemo(
    () =>
      draft.mood.id && moods?.find(mood => mood.id === draft.mood.id)?.color,
    [draft.mood.id, moods],
  )

  if (!moods) return null

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
          selectedMoodId={draft.mood.id}
          onMoodIdChange={onMoodIdChange}
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
