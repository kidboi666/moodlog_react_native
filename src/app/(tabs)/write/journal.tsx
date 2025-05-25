import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

import { EnhancedTextInput } from '@/components/features/write'
import { useJournalDraftForm } from '@/hooks'
import { useAddJournal } from '@/queries'
import { toSingle } from '@/utils'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function WriteJournalScreen() {
  const { moodName } = useLocalSearchParams()
  const { draft, onContentChange, onImageUriChange, onImageUriRemove } =
    useJournalDraftForm(toSingle(moodName))
  const { mutate: onSubmit } = useAddJournal()

  const handleSubmit = () => {
    onSubmit(draft)
  }

  return (
    <SafeAreaView style={styles.container}>
      <EnhancedTextInput
        onSubmit={handleSubmit}
        imageUri={draft.imageUri}
        contentValue={draft.content}
        onContentChange={onContentChange}
        onImageUriRemove={onImageUriRemove}
        onImageUriChange={onImageUriChange}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
  },
})
