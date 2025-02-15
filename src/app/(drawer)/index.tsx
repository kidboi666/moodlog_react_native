import { Separator } from 'tamagui';
import { useJournalContext } from '@/store/hooks/useJournalContext';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/Container';
import { WeekDayPicker } from '@/components/WeekDayPicker';

export default function HomeScreen() {
  const { removeJournal, selectedJournals } = useJournalContext();
  return (
    <Container>
      <FlatList
        data={selectedJournals}
        ListHeaderComponent={WeekDayPicker}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" mx="$2" />
        )}
        renderItem={({ item }) => (
          <JournalCard journal={item} onDelete={removeJournal} />
        )}
      />
    </Container>
  );
}
