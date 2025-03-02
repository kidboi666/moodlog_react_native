import { H1, H3, Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
import React, { useEffect } from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { Container } from '@/components/layouts/containers/Container';
import { useLocalSearchParams } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { useTranslation } from 'react-i18next';
import { useScroll } from '@/store/hooks/useScroll';
import { toSingle } from '@/utils/common';
import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';

export default function JournalScreen() {
  const { journalId } = useLocalSearchParams();
  const { selectedJournal, onSelectedJournalChange } = useJournal();
  const { fontSize } = useApp();
  const { onScroll } = useScroll();
  const { t } = useTranslation();

  useEffect(() => {
    onSelectedJournalChange(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <Container flexDirection="row" gap="$3" pl={0}>
      <View
        width="3%"
        animation="medium"
        animateOnly={ENTER_STYLE_KEY}
        enterStyle={ENTER_STYLE}
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
              gap="$2"
              justify="center"
              animation="bouncy"
              animateOnly={ENTER_STYLE_KEY}
              enterStyle={ENTER_STYLE}
            >
              <H3 color="$gray11">
                {t(`emotions.levels.${selectedJournal.emotion?.level}`)}
              </H3>
              <H3>{t(`emotions.types.${selectedJournal.emotion?.type}`)}</H3>
            </XStack>
          </XStack>
          <YStack
            animation="medium"
            animateOnly={['opacity']}
            enterStyle={{
              opacity: 0,
            }}
          >
            <H1 mb="$2">{selectedJournal.title}</H1>
            <Paragraph fontWeight="300" fontSize={fontSize}>
              {selectedJournal.content}
            </Paragraph>
            <View height="$8" />
          </YStack>
        </YStack>
      </ScrollView>
    </Container>
  );
}
