import { H1, H3, Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { Container } from '@/components/layouts/containers/Container';
import { useLocalSearchParams } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { ENTER_STYLE } from '@/constants/styles';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/store/hooks/useScroll';
import { toSingle } from '@/utils/common';

export default function JournalPage() {
  const { journalId } = useLocalSearchParams();
  const { selectedJournal, onChangeSelectedJournal } = useJournal();
  const { fontSize } = useApp();
  const { onScroll } = useScroll();
  const { t } = useTranslation();

  useEffect(() => {
    onChangeSelectedJournal(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <Container flexDirection="row" gap="$3" pl={0}>
      <View
        width="3%"
        height="100%"
        borderTopRightRadius="$4"
        borderBottomRightRadius="$4"
        bg={
          emotionTheme[selectedJournal.emotion.type][
            selectedJournal.emotion.level
          ]
        }
      />
      <ScrollView flex={1} onScroll={onScroll}>
        <YStack gap="$4">
          <XStack gap="$2">
            <XStack
              animation="bouncy"
              gap="$2"
              justify="center"
              enterStyle={ENTER_STYLE}
            >
              <H3 color="$gray11">
                {t(`emotions.levels.${selectedJournal.emotion?.level}`)}
              </H3>
              <H3>{t(`emotions.types.${selectedJournal.emotion?.type}`)}</H3>
            </XStack>
          </XStack>
          <H1 mb="$2">{selectedJournal.title}</H1>
          <Paragraph fontWeight="300" fontSize={fontSize}>
            {selectedJournal.content}
          </Paragraph>
          <View height="$8" />
        </YStack>
      </ScrollView>
    </Container>
  );
}
