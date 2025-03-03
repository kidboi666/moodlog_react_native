import { Container } from '@/components/layouts/containers/Container';
import { GardenSection } from '@/components/features/garden/GardenSection';
import { StatsContainer } from '@/components/features/stats/StatsContainer';
import { ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { CurrentMonth } from '@/components/features/stats/selected-month/CurrentMonth';
import { CARD_DELAY } from '@/constants/styles';
import { FadeIn } from '@/components/FadeIn';

export default function RecordScreen() {
  const { onScroll } = useScroll();

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
      <Container edges={['top', 'bottom']} gap="$4">
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
