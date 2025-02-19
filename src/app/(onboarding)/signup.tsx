import { Button, H1, H3, Paragraph, View, YStack } from 'tamagui';
import { useUser } from '@/store/hooks/useUser';
import { Container } from '@/components/containers/Container';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';

export default function SignupScreen() {
  const { setIsInitialUser } = useUser();

  const handleComplete = async () => {
    setIsInitialUser(true);
  };

  return (
    <Container edges={['bottom']}>
      <YStack gap="$4" flex={1}>
        <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
          <H1>Take Your Experience Further</H1>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
          <YStack bg="$gray12" p="$5" gap="$4" rounded="$8">
            <H3 color="$gray1">Sign up to unlock additional features:</H3>
            <YStack gap="$2">
              <Paragraph color="$gray2">• Sync across devices</Paragraph>
              <Paragraph color="$gray2">• Secure backup</Paragraph>
              <Paragraph color="$gray2">• Advanced statistics</Paragraph>
            </YStack>
          </YStack>
        </FadeIn>
        <View flex={1} />
        <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
          <Button themeInverse onPress={handleComplete}>
            Alright
          </Button>
        </FadeIn>
      </YStack>
    </Container>
  );
}
