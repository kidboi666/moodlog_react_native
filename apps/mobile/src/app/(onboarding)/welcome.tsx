import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { H1, H2 } from 'tamagui';

import { ArrowRight } from '@tamagui/lucide-icons';

import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useStepProgress } from '@/core/store/step-progress.store';

import * as S from '@/styles/screens/onboarding/Welcome.styled';

export default function Screen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { currentStep, goToNextStep } = useStepProgress();

  const handleClickNextButton = () => {
    if (currentStep === 0) {
      goToNextStep();
      router.push('/email');
    }
  };

  return (
    <ViewContainer edges={['bottom']}>
      <S.WelcomeContainer>
        <S.WelcomeContent>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
            <S.TitleBox>
              <H1>{t('onboarding.welcome.title')}</H1>
              <ShakeEmoji emoji="👋" />
            </S.TitleBox>
          </FadeIn>
          <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
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
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <H2>{t('onboarding.welcome.go')}</H2>
        </FadeIn>
      </S.WelcomeContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.NextButton iconAfter={ArrowRight} onPress={handleClickNextButton}>
          {t('common.button.next')}
        </S.NextButton>
      </FadeIn>
    </ViewContainer>
  );
}
