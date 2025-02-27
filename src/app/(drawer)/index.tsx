import { Separator } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { FlatList } from 'react-native';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/containers/Container';
import { EmptyJournal } from '@/components/EmptyJournal';
import { HomeHeaderWithCalendar } from '@/components/HomeHeaderWithCalendar';
import { useScroll } from '@/store/hooks/useScroll';
import { Redirect } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';

export default function HomeScreen() {
  const { selectedJournals } = useJournal();
  const { onScroll } = useScroll();
  const { isInitialApp } = useApp();

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Container>
      <FlatList
        data={selectedJournals}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={HomeHeaderWithCalendar}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <Separator borderColor="transparent" mb="$4" />
        )}
        renderItem={({ item, index }) => (
          <JournalCard journal={item} index={index} />
        )}
        ListEmptyComponent={EmptyJournal}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      />
    </Container>
  );
}
