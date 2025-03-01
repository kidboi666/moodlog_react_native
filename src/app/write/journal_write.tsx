import { ContentInput } from '@/components/ContentInput';
import { View } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useDraft } from '@/store/hooks/useDraft';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const { draft, onTitleChange, onContentChange } = useDraft();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Container flexDirection="row" gap="$3" pl={0}>
        {draft.emotion ? (
          <View
            width="3%"
            height="100%"
            borderTopRightRadius="$4"
            borderBottomRightRadius="$4"
            bg={emotionTheme[draft.emotion?.type][draft.emotion?.level]}
          />
        ) : (
          <View
            width="3%"
            height="100%"
            borderTopRightRadius="$4"
            bg="$gray8"
          />
        )}
        <ContentInput
          fontSize={fontSize}
          contentValue={draft.content}
          titleValue={draft.title}
          onContentChange={onContentChange}
          onTitleChange={onTitleChange}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
