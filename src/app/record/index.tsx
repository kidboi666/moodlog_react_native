import { Container } from '@/components/layouts/containers/Container';
import { GardenSection } from '@/components/features/garden/GardenSection';
import { StatsContainer } from '@/components/features/stats/StatsContainer';
import { Button, ScrollView } from 'tamagui';
import { useScroll } from '@/store/hooks/useScroll';
import { Floating } from '@/components/Floating';
import { CurrentMonth } from '@/components/features/stats/selected-month/CurrentMonth';
import { CARD_DELAY, PRESS_STYLE } from '@/constants/styles';
import { FadeIn } from '@/components/FadeIn';
import { HeaderContainer } from '@/components/layouts/containers/HeaderContainer';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

export default function RecordScreen() {
  const { onScroll } = useScroll();

  return (
    <>
      <ScrollView onScroll={onScroll}>
        <Container gap="$4" pb="$10">
          <HeaderContainer>
            <Button
              p="$2"
              unstyled
              rounded="$2"
              icon={<ArrowLeft size="$1" />}
              onPress={() => router.back()}
              pressStyle={PRESS_STYLE}
            />
          </HeaderContainer>
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
      <Floating />
    </>
  );
}
