import { Button, H1, H3, Paragraph, View, XStack, YStack } from 'tamagui';
import { useUser } from '@/store/hooks/useUser';
import { Container } from '@/components/containers/Container';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { useRouter } from 'expo-router';
import { useStepProgress } from '@/store/hooks/useStepProgress';
import { ArrowLeft } from '@tamagui/lucide-icons';

export default function SignupScreen() {
  const router = useRouter();
  const { goToPrevStep, currentStep } = useStepProgress();
  const { draftUserName, signUp } = useUser();

  const handlePrevStep = () => {
    if (currentStep === 2) {
      goToPrevStep();
      router.back();
    }
  };

  const handleSubmit = (userName: string) => {
    signUp(userName);
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
            <Button>Access</Button>
          </YStack>
        </FadeIn>
        <View flex={1} />
        <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
          <XStack justify="space-between">
            <Button
              size="$5"
              onPress={handlePrevStep}
              icon={<ArrowLeft size="$1" />}
            >
              Prev
            </Button>
            <Button
              size="$5"
              themeInverse
              onPress={() => handleSubmit(draftUserName)}
            >
              Alright
            </Button>
          </XStack>
        </FadeIn>
      </YStack>
    </Container>
  );
}
