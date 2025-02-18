import { Button, H1, H2, H3, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { Container } from '@/components/Container';
import { ShakeHand } from '@/components/ShakeHand';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Container>
      <YStack flex={1}>
        <YStack flex={1} gap="$6">
          <XStack gap="$2">
            <H1>Hello!</H1>
            <ShakeHand />
          </XStack>
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <H3 color="$gray11" mb="$4">
              Welcome to Your Daily Journey
            </H3>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <H3 color="$gray11">Every day is a new page in your story</H3>
          </FadeIn>
        </YStack>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <H2>Let's write it together.</H2>
        </FadeIn>
      </YStack>
      <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
        <Button
          mt="$8"
          themeInverse
          size="$5"
          iconAfter={<ArrowRight size="$1" />}
          onPress={() => router.push('/(onboarding)/nickname')}
        >
          Next
        </Button>
      </FadeIn>
    </Container>
  );
}
