import { ContentInput } from '@/components/write/ContentInput';
import { Button, Form, Separator, XStack, YStack } from 'tamagui';
import React, { useCallback, useState } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { Check } from '@tamagui/lucide-icons';
import { Container } from '@/components/shared/Container';
import { useFocusEffect } from 'expo-router';
import { CalendarPicker } from '@/components/write/CalendarPicker';

export default function WriteScreen() {
  const { addJournal, draft, updateDraftContent } = useJournal();
  const [key, setKey] = useState(0);

  const handleSubmit = () => {
    if (draft?.emotion) {
      addJournal(draft);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container
      key={key}
      animation="medium"
      enterStyle={{
        y: 100,
        opacity: 0,
      }}
    >
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
  );
}
