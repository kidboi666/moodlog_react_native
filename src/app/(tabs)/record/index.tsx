import { Container } from '@/components/layouts/containers/Container';
import { GardenSection } from '@/screens/garden/GardenSection';
import { StatsContainer } from '@/screens/stats/StatsContainer';
import { ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { CurrentMonth } from '@/screens/stats/selected-month/CurrentMonth';
import { FadeIn } from '@/components/FadeIn';
import { CARD_DELAY } from '@/constants/time';

export default function RecordScreen() {
  const { onScroll } = useScroll();

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
      <Container edges={['top', 'bottom']} gap="$4" padded>
        <FadeIn delay={CARD_DELAY.FIRST}>
          <StatsContainer />
        </FadeIn>
        <FadeIn delay={CARD_DELAY.SECOND}>
          <GardenSection />
        </FadeIn>
        <FadeIn delay={CARD_DELAY.THIRD}>
          <CurrentMonth />
        </FadeIn>
      </Container>
    </ScrollView>
  );
}
