import { ContentInput } from '@/components/ContentInput';
import { Button, Form, Separator, XStack, YStack } from 'tamagui';
import React from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { Check } from '@tamagui/lucide-icons';
import { ContainerWithSafeAreaView } from '@/components/Container';
import { CalendarPicker } from '@/components/CalendarPicker';

export default function WriteScreen() {
  const { addJournal, draft, updateDraftContent } = useJournalContext();

  const handleSubmit = () => {
    if (draft?.emotion) {
      addJournal(draft);
    }
  };

  return (
    <ContainerWithSafeAreaView edges={['bottom']}>
      <YStack flex={1} gap="$3">
        <CalendarPicker />
        <XStack flex={1} gap="$4" ml="$2">
          <Separator vertical />
          <Form onSubmit={handleSubmit} gap="$4" flex={1}>
            <ContentInput
              value={draft.content}
              onChangeText={updateDraftContent}
            />
            <Form.Trigger asChild disabled={!draft?.content || !draft?.emotion}>
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
    </ContainerWithSafeAreaView>
  );
}
