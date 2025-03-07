import { Container } from '@/components/layouts/containers/Container';
import { Button, H2, H3, Input, XStack, YStack } from 'tamagui';
import { FadeIn } from '@/components/FadeIn';
import { useUser } from '@/store/hooks/useUser';
import { useRouter } from 'expo-router';
import { useStepProgress } from '@/store/hooks/useStepProgress';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { PARAGRAPH_DELAY } from '@/constants/time';

export default function NicknameScreen() {
  const { draftUserName, onDraftUserNameChange } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress();

  const handlePrevStep = () => {
    if (currentStep === 1) {
      goToPrevStep();
      router.back();
    }
  };

  const handleNextStep = () => {
    if (!draftUserName) return;
    if (currentStep === 1) {
      goToNextStep();
      router.push('/(onboarding)/signup');
    }
  };

  return (
    <Container edges={['bottom']}>
      <YStack flex={1} gap="$6">
        <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
          <H2>{t('onboarding.nickname.title')}</H2>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
          <H3 color="$gray11">{t('onboarding.nickname.description')}</H3>
        </FadeIn>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <Input
            value={draftUserName}
            onChangeText={onDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
        </FadeIn>
      </YStack>
      <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
        <XStack justify="space-between">
          <Button
            size="$5"
            icon={<ArrowLeft size="$1" />}
            onPress={handlePrevStep}
          >
            {t('common.button.prev')}
          </Button>
          <Button
            themeInverse
            size="$5"
            disabled={!draftUserName}
            opacity={!draftUserName ? 0.2 : 1}
            onPress={handleNextStep}
            iconAfter={<ArrowRight size="$1" />}
          >
            {t('common.button.next')}
          </Button>
        </XStack>
      </FadeIn>
    </Container>
  );
}
