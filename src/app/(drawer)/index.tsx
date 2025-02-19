import { Separator } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/containers/Container';
import { EmptyJournal } from '@/components/EmptyJournal';
import { HomeHeaderWithCalendar } from '@/components/HomeHeaderWithCalendar';

export default function HomeScreen() {
  const { selectedJournals } = useJournal();

  return (
    <Container>
      <FlatList
        data={selectedJournals}
        ListHeaderComponent={HomeHeaderWithCalendar}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" />
        )}
        renderItem={({ item, index }) => (
          <JournalCard journal={item} index={index} />
        )}
        ListEmptyComponent={EmptyJournal}
      />
    </Container>
  );
}
