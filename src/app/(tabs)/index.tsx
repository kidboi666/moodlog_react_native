import { Button, H1, ScrollView, Separator, XStack, YStack } from 'tamagui';
import { Container } from '@/components/common/Container';
import { JournalCard } from '@/components/home/JournalCard';
import { FlatList } from 'react-native';
import { Text } from '@/components/common/Text';
import { formatDate } from '@/utils/common/formatDate';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useDiary } from '@/store/context/useDiary';
import { SelectEmotion } from '@/components/modals/SelectEmotion';

export default function HomeScreen() {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<'month' | 'week'>('month');
  const { journals, removeJournal } = useDiary();

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  const { year, month, day } = formatDate(new Date());
  return (
    <Container gap={12}>
      <YStack
        key={key}
        animation="quick"
        enterStyle={{
          x: -300,
          opacity: 0,
        }}
        exitStyle={{
          x: 300,
          opacity: 0,
        }}
        flex={1}
      >
        <FlatList
          data={journals}
          ListHeaderComponent={() => (
            <YStack gap={12} mb="$5">
              <H1 fontSize="$9" fontWeight="900" color="$text">
                Home
              </H1>
              <Text>
                {year}. {month}. {day}.
              </Text>
              <ScrollView horizontal>
                <XStack gap={8}>
                  <Button
                    animation="quick"
                    onPress={() => setSelectedMenu('month')}
                    themeInverse={selectedMenu === 'month'}
                  >
                    Month
                  </Button>
                  <Button
                    animation="quick"
                    onPress={() => setSelectedMenu('week')}
                    themeInverse={selectedMenu === 'week'}
                  >
                    Week
                  </Button>
                  <Button onPress={() => setIsOpen(true)}>
                    Select Emotion
                  </Button>
                </XStack>
              </ScrollView>
            </YStack>
          )}
          ItemSeparatorComponent={() => (
            <Separator borderColor="transparent" my="$3" />
          )}
          renderItem={itemData => (
            <JournalCard journal={itemData.item} onDelete={removeJournal} />
          )}
        />
      </YStack>
      <SelectEmotion open={isOpen} onOpenChange={setIsOpen} />
    </Container>
  );
}
