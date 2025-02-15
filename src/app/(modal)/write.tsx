import { ContentInput } from '@/components/ContentInput';
import { Button, Form, Separator, useTheme, XStack, YStack } from 'tamagui';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Check } from '@tamagui/lucide-icons';
import { CalendarPicker } from '@/components/CalendarPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '@/components/Container';

export default function WriteScreen() {
  const theme = useTheme();
  const { addJournal, draft, updateDraftContent } = useJournalContext();

  const handleSubmit = () => {
    if (draft?.emotion) {
      addJournal(draft);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      edges={['bottom']}
    >
      <Container>
        <YStack flex={1} gap="$3">
          <CalendarPicker />
          <XStack flex={1} gap="$4" ml="$2">
            <Separator vertical />
            <Form onSubmit={handleSubmit} gap="$4" flex={1}>
              <ContentInput
                value={draft.content}
                onChangeText={updateDraftContent}
              />
              <Form.Trigger
                asChild
                disabled={!draft?.content || !draft?.emotion}
              >
                <Button
                  bg="$background"
                  animation="medium"
                  themeInverse
                  self="flex-end"
                  disabled={!draft.content}
                  icon={Check}
                  color="$color"
                  opacity={!draft.content ? 0.5 : 1}
                >
                  Submit
                </Button>
              </Form.Trigger>
            </Form>
          </XStack>
        </YStack>
      </Container>
    </SafeAreaView>
  );
}
