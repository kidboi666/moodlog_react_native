import { Container } from '@/components/layouts/containers/Container';
import { GardenSection } from '@/components/features/garden/GardenSection';
import { StatsContainer } from '@/components/features/stats/StatsContainer';
import { ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { Floating } from '@/components/Floating';
import { CurrentMonth } from '@/components/features/stats/expressive-month/CurrentMonth';

export default function MainScreen() {
  const { onScroll } = useScroll();

  return (
    <>
      <ScrollView onScroll={onScroll}>
        <Container gap="$4">
          <StatsContainer />
          <GardenSection />
          <CurrentMonth />
        </Container>
      </ScrollView>
      <Floating />
    </>
  );
}
