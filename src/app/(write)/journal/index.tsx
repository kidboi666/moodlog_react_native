import { Check } from '@tamagui/lucide-icons'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native'

import { JournalMenuSelector, MoodLevelForm } from '@/components/features/mood'
import { EmptyMoodView, MainRecordFlow } from '@/components/features/write'
import { HeaderContent, ScreenView, StepDot } from '@/components/shared'
import { useJournalDraftForm } from '@/hooks'
import { MoodQueries, useAddJournal } from '@/queries'

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
  const { mutate: onSubmit } = useAddJournal()
  if (!moods) return null

  if (isLoading) {
    return (
      <ScreenView Header={<HeaderContent leftAction={() => router.back()} />}>
        <ActivityIndicator size='large' />
      </ScreenView>
    )
  }

  if (Object.keys(moods).length === 0) {
    return (
      <ScreenView Header={<HeaderContent leftAction={() => router.back()} />}>
        <EmptyMoodView />
      </ScreenView>
    )
  }

  return (
    <ScreenView
      edges={['bottom']}
      style={styles.container}
      Header={
        <HeaderContent
          leftAction={() => router.back()}
          rightAction={() => onSubmit(draft)}
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
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
})
