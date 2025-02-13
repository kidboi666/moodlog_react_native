import { H1, Separator, YStack } from 'tamagui';
import { useState } from 'react';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { CurrentDate } from '@/components/Date';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/Container';
import { WeekDayPicker } from '@/components/WeekDayPicker';

export default function HomeScreen() {
  const [selectedMenu, setSelectedMenu] = useState<'month' | 'week'>('month');
  const { journals, removeJournal } = useJournalContext();

  return (
    <Container>
      <FlatList
        data={journals}
        ListHeaderComponent={() => (
          <YStack gap="$2" mb="$4">
            <H1 fontWeight="800">Home</H1>
            <CurrentDate />
            <WeekDayPicker />
          </YStack>
        )}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" mx="$2" />
        )}
        renderItem={itemData => (
          <JournalCard journal={itemData.item} onDelete={removeJournal} />
        )}
      />
    </Container>
  );
}
