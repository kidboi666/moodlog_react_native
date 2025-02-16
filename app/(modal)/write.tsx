import { ContentInput } from '@/components/ContentInput';
import { Button, Form, Separator, useTheme, XStack, YStack } from 'tamagui';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Check } from '@tamagui/lucide-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '@/components/Container';
import { useToastController } from '@tamagui/toast';
import { EnterStyle, ExitStyle, PressStyle } from '@/constants/styles';
import { useAppContext } from '@/store/hooks/useAppContext';

export default function WriteScreen() {
  const theme = useTheme();
  const { fontSize } = useAppContext();
  const toast = useToastController();
  const { addJournal, draft, updateDraftContent } = useJournalContext();

  const handleSubmit = () => {
    if (!draft.emotion?.type) {
      toast.show('Select the emotional intensity!', {
        message: 'No emotional intensity selected',
      });
    }
    addJournal(draft);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      edges={['bottom']}
    >
      <Container>
        <YStack flex={1} gap="$3">
          <XStack flex={1} gap="$4" ml="$2">
            <Separator vertical />
            <Form onSubmit={handleSubmit} gap="$4" flex={1}>
              <ContentInput
                fontSize={fontSize}
                value={draft.content}
                onChangeText={updateDraftContent}
              />
              <Form.Trigger
                asChild
                disabled={!draft?.content || !draft?.emotion}
              >
                {draft.content && (
                  <Button
                    bg="$background"
                    animation="quick"
                    themeInverse
                    self="flex-end"
                    disabled={!draft.content}
                    icon={Check}
                    color="$color"
                    opacity={!draft.content ? 0.5 : 1}
                    pressStyle={PressStyle}
                    enterStyle={EnterStyle}
                    exitStyle={ExitStyle}
                  >
                    Submit
                  </Button>
                )}
              </Form.Trigger>
            </Form>
          </XStack>
        </YStack>
      </Container>
    </SafeAreaView>
  );
}
