import { H1, H2 } from 'tamagui';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { Container } from '@/components/layouts/containers/Container';
import { ShakeEmoji } from '@/components/ShakeEmoji';
import { FadeIn } from '@/components/FadeIn';
import { useStepProgress } from '@/store/hooks/useStepProgress';
import { useTranslation } from 'react-i18next';
import { PARAGRAPH_DELAY } from '@/constants/time';
import * as S from '../../styles/onboarding/Welcome.styled';

export default function WelcomeScreen() {
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
      <S.WelcomeContainer>
        <S.WelcomeContent>
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <S.TitleBox>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji="👋" />
            </S.TitleBox>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <S.DescriptionBox>
              <S.Description1>
                {t('onboarding.welcome.description')}
              </S.Description1>
              <S.Description2>
                {t('onboarding.welcome.description2')}
              </S.Description2>
            </S.DescriptionBox>
          </FadeIn>
        </S.WelcomeContent>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </FadeIn>
      </S.WelcomeContainer>
      <FadeIn delay={PARAGRAPH_DELAY.FOURTH}>
        <S.NextButton iconAfter={ArrowRight} onPress={handleClickNextButton}>
          {t('common.button.next')}
        </S.NextButton>
      </FadeIn>
    </Container>
  );
}
