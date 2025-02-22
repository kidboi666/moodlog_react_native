import { Container } from '@/components/containers/Container';
import { GardenContainer } from '@/components/features/garden/GardenContainer';
import { useJournal } from '@/store/hooks/useJournal';
import { StatsContainer } from '@/components/features/stats/StatsContainer';
import { ScrollView } from 'tamagui';

export default function RecordScreen() {
  const { monthlyJournals } = useJournal();
  return (
    <ScrollView>
      <Container gap="$4">
        <StatsContainer />
        <GardenContainer />
      </Container>
    </ScrollView>
  );
}
