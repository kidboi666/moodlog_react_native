import { ContentInput } from '@/components/ContentInput';
import { Button, Form, View } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { Check } from '@tamagui/lucide-icons';
import { Container } from '@/components/containers/Container';
import { useToastController } from '@tamagui/toast';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import React from 'react';

export default function WriteScreen() {
  const { fontSize } = useApp();
  const toast = useToastController();
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
    <Container flexDirection="row" gap="$3" pl={0}>
      {draft.emotion ? (
        <View
          width="3%"
          height="100%"
          borderTopRightRadius="$4"
          bg={emotionTheme[draft.emotion?.type][draft.emotion?.level]}
        />
      ) : (
        <View width="3%" height="100%" borderTopRightRadius="$4" bg="$gray8" />
      )}

      <Form onSubmit={handleSubmit} gap="$4" flex={1}>
        <ContentInput
          fontSize={fontSize}
          contentValue={draft.content}
          titleValue={draft.title}
          onChangeContentText={updateDraftContent}
          onChangeTitleText={updateDraftTitle}
        />
        <Form.Trigger asChild disabled={!draft?.content || !draft?.emotion}>
          {draft.content && (
            <Button
              bg="$background"
              mb="$2"
              animation="quick"
              themeInverse
              self="flex-end"
              disabled={!draft.content}
              icon={Check}
              color="$color"
              opacity={!draft.content ? 0.5 : 1}
              pressStyle={PRESS_STYLE}
              enterStyle={{ ...ENTER_STYLE, y: -10 }}
            />
          )}
        </Form.Trigger>
      </Form>
    </Container>
  );
}
