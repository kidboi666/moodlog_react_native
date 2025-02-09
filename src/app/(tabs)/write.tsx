import { ContentInput } from '@/components/write/ContentInput';
import { Button, Form, Separator, XStack, YStack } from 'tamagui';
import React, { useCallback, useState } from 'react';
import { useDiary } from '@/store/useDiary';
import { Calendar, Check } from '@tamagui/lucide-icons';
import { CurrentDate } from '@/components/share/Date';
import { Container } from '@/components/share/Container';
import { useFocusEffect } from 'expo-router';

export default function WriteScreen() {
  const {
    journals,
    addJournal,
    draftJournal,
    updateDraftEmotion,
    updateDraftContent,
  } = useDiary();
  const [key, setKey] = useState(0);

  const handleSubmit = () => {
    addJournal(draftJournal);
  };

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container
      key={key}
      enterStyle={{
        y: 100,
        opacity: 0,
      }}
    >
      <YStack flex={1} gap="$3">
        <Button
          unstyled
          pl="$0.5"
          icon={Calendar}
          items="center"
          flexDirection="row"
        >
          <CurrentDate />
        </Button>
        <XStack flex={1} gap="$4" ml="$2">
          <Separator vertical />
          <Form onSubmit={handleSubmit} gap="$4" flex={1}>
            <ContentInput
              value={draftJournal.content}
              onChangeText={updateDraftContent}
            />

            <Form.Trigger asChild disabled={!draftJournal.content}>
              <Button
                bg="$background"
                themeInverse
                self="flex-end"
                disabled={!draftJournal.content}
                icon={Check}
                color="$color"
                opacity={!draftJournal.content ? 0.5 : 1}
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
