import { Button, H1, H2, H3, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { Container } from '@/components/containers/Container';
import { ShakeHand } from '@/components/ShakeHand';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { useStepProgress } from '@/store/hooks/useStepProgress';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { currentStep, goToNextStep } = useStepProgress();

  const handleClickNextButton = () => {
    if (currentStep === 0) {
      goToNextStep();
      router.push('/(onboarding)/nickname');
    }
  };

  return (
    <Container edges={['bottom']}>
      <YStack flex={1}>
        <YStack flex={1} gap="$6">
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <XStack gap="$2">
              <H1>{t('onboarding.index.title')}</H1>
              <ShakeHand />
            </XStack>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <YStack gap="$6">
              <H3 color="$gray11" mb="$4">
                {t('onboarding.index.description')}
              </H3>
              <H3 color="$gray11">{t('onboarding.index.description2')}</H3>
            </YStack>
          </FadeIn>
        </YStack>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <H2>{t('onboarding.index.go')}</H2>
        </FadeIn>
      </YStack>
      <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
        <Button
          mt="$8"
          themeInverse
          self="flex-end"
          size="$5"
          iconAfter={<ArrowRight size="$1" />}
          onPress={handleClickNextButton}
        >
          {t('button.next')}
        </Button>
      </FadeIn>
    </Container>
  );
}
