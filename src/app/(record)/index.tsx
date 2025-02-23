import { Container } from '@/components/containers/Container';
import { GardenContainer } from '@/components/features/garden/GardenContainer';
import { useJournal } from '@/store/hooks/useJournal';
import { StatsContainer } from '@/components/features/stats/StatsContainer';
import { ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';

export default function RecordScreen() {
  const { monthlyJournals } = useJournal();
  const { onScroll } = useScroll();
  return (
    <ScrollView onScroll={onScroll}>
      <Container gap="$4">
        <StatsContainer />
        <GardenContainer />
      </Container>
    </ScrollView>
  );
}
