import { ContentInput } from '@/components/ContentInput';
import { Button, ScrollView, View } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { Check } from '@tamagui/lucide-icons';
import { Container } from '@/components/containers/Container';
import { useToastController } from '@tamagui/toast';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import React from 'react';
import { PRESS_STYLE } from '@/constants/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

export default function WriteScreen() {
  const { fontSize } = useApp();
  const toast = useToastController();
  const insets = useSafeAreaInsets();
  const { addJournal, draft, updateDraftContent, updateDraftTitle } =
    useJournal();

  const handleSubmit = () => {
    if (!draft.emotion?.type) {
      toast.show('Select the emotional intensity!', {
        message: 'No emotional intensity selected',
      });
    }
    addJournal(draft);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Container flexDirection="row" gap="$3" pl={0}>
        {draft.emotion ? (
          <View
            width="3%"
            height="100%"
            borderTopRightRadius="$4"
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

        <ScrollView flex={1}>
          <ContentInput
            fontSize={fontSize}
            contentValue={draft.content}
            titleValue={draft.title}
            onChangeContentText={updateDraftContent}
            onChangeTitleText={updateDraftTitle}
          />
        </ScrollView>
        <Button
          bg="$background"
          animation="quick"
          themeInverse
          position="absolute"
          r="$2"
          b={insets.bottom}
          icon={Check}
          z={200}
          color="$color"
          disabled={!draft?.content}
          opacity={!draft.content ? 0.5 : 1}
          pressStyle={PRESS_STYLE}
          onPress={handleSubmit}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
