import { Check } from '@tamagui/lucide-icons'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { Spinner, styled } from 'tamagui'

import { JournalMenuSelector, MoodLevelForm } from '@/components/features/mood'
import { EmptyMoodView, MainRecordFlow } from '@/components/features/write'
import { HeaderContent, StepDot, ViewContainer } from '@/components/shared'
import { useAddJournal, useJournalDraftForm } from '@/hooks'
import { MoodQueries } from '@/queries'

export default function WriteJournalScreen() {
  const router = useRouter()
  const { data: moods, isLoading } = useQuery(MoodQueries.getMoods())
  const {
    draft,
    onContentChange,
    onMoodLevelChange,
    onMoodIdChange,
    onImageUriChange,
    onImageUriRemove,
  } = useJournalDraftForm(moods?.[0]?.id)
  const { onSubmit } = useAddJournal(draft)
  console.log(moods)
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
          rightActionDisabled={!draft.moodId}
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
          selectedMoodId={draft.moodId}
          onMoodIdChange={onMoodIdChange}
          onImageUriRemove={onImageUriRemove}
          onContentChange={onContentChange}
          onImageUriChange={onImageUriChange}
        />
        <MoodLevelForm
          moodColor={moods[draft?.moodId]?.color}
          moodLevel={draft.moodLevel}
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
