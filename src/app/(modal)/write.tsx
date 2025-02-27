import { ContentInput } from '@/components/ContentInput';
import { View } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { Container } from '@/components/layouts/containers/Container';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { KeyboardAvoidingView } from 'react-native';

export default function WriteScreen() {
  const { fontSize } = useApp();
  const { draft, updateDraftContent, updateDraftTitle } = useJournal();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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
          onChangeContentText={updateDraftContent}
          onChangeTitleText={updateDraftTitle}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
