import { Button, Separator } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/containers/Container';
import { EmptyJournal } from '@/components/EmptyJournal';
import { HomeHeaderWithCalendar } from '@/components/HomeHeaderWithCalendar';
import { useApp } from '@/store/hooks/useApp';
import { Delete } from '@tamagui/lucide-icons';

export default function HomeScreen() {
  const { selectedJournals } = useJournal();
  const { users, removeUser } = useApp();

  return (
    <Container gap="$4">
      <Button onPress={removeUser} icon={Delete} />
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
