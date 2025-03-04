import { H3, Paragraph, ScrollView, View, XStack, YStack } from 'tamagui';
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
import JournalHeader from '@/components/layouts/headers/JournalHeader';
import { Image, StyleSheet } from 'react-native';

export default function JournalScreen() {
  const { journalId } = useLocalSearchParams();
  const { selectedJournal, onSelectedJournalChange } = useJournal();
  const { fontSize } = useApp();
  const { onScroll } = useScroll();
  const { t } = useTranslation();
  console.log(selectedJournal);
  useEffect(() => {
    onSelectedJournalChange(toSingle(journalId));
  }, [journalId]);

  if (!selectedJournal || selectedJournal?.id !== journalId) return null;

  return (
    <ScrollView onScroll={onScroll} overScrollMode="always">
      <Container edges={['bottom']} pl={0}>
        <JournalHeader />
        <XStack gap="$3">
          <View
            width="3%"
            animation="medium"
            animateOnly={['transform']}
            enterStyle={{ x: -20 }}
            borderTopRightRadius="$4"
            borderBottomRightRadius="$4"
            bg={
              emotionTheme[selectedJournal.emotion.type][
                selectedJournal.emotion.level
              ]
            }
          />
          <YStack gap="$4" flex={1}>
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
            {selectedJournal.imageUri && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: selectedJournal.imageUri }}
                  style={styles.image}
                />
              </View>
            )}
            <YStack
              animation="medium"
              animateOnly={['opacity']}
              enterStyle={{
                opacity: 0,
              }}
            >
              <Paragraph fontWeight="300" fontSize={fontSize}>
                {selectedJournal.content}
              </Paragraph>
              <View height="$8" />
            </YStack>
          </YStack>
        </XStack>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    elevation: 10,
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginHorizontal: 'auto',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
