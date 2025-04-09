import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { H1, Spinner } from 'tamagui';

import { ArrowLeft, Check } from '@tamagui/lucide-icons';

import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useApp } from '@/core/store/app.store';
import { useStepProgress } from '@/core/store/step-progress.store';
import { useUser } from '@/core/store/user.store';

import * as S from '@/styles/screens/onboarding/Signup.styled';

export default function Screen() {
  const router = useRouter();
  const { goToPrevStep, currentStep } = useStepProgress();
  const { draftUserName, draftEmail, draftPassword, registerUser, isLoading } =
    useUser();
  const { firstLaunchDate } = useApp();
  const { t } = useTranslation();

  const handlePrevStep = () => {
    if (currentStep === 4) {
      goToPrevStep();
      router.back();
    }
  };

  const handleSubmit = () => {
    registerUser(draftUserName, draftEmail, draftPassword);
  };

  useEffect(() => {
    if (firstLaunchDate) {
      router.replace('/(tabs)');
    }
  });

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H1>{t('onboarding.signup.title')}</H1>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.BenefitsContainer>
            <S.BenefitTitle>{t('onboarding.signup.ota')}</S.BenefitTitle>
            <S.BenefitsBox>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.sync')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.backup')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.signup.benefits.stats')}
              </S.BenefitText>
            </S.BenefitsBox>
          </S.BenefitsContainer>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <S.UserInfoSummary>
            <S.InfoItem>
              <S.InfoLabel>{t('onboarding.signup.summary.email')}:</S.InfoLabel>
              <S.InfoValue>{draftEmail}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>
                {t('onboarding.signup.summary.nickname')}:
              </S.InfoLabel>
              <S.InfoValue>{draftUserName}</S.InfoValue>
            </S.InfoItem>
          </S.UserInfoSummary>
        </FadeIn>
        <S.RestBox />
        <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
          <S.ButtonContainer>
            <S.PrevButton onPress={handlePrevStep} icon={ArrowLeft}>
              {t('common.button.prev')}
            </S.PrevButton>
            <S.ConfirmButton disabled={isLoading} onPress={handleSubmit}>
              {isLoading || firstLaunchDate ? <Spinner /> : <Check />}
              {t('common.button.confirm')}
            </S.ConfirmButton>
          </S.ButtonContainer>
        </FadeIn>
      </S.YStackContainer>
    </ViewContainer>
  );
}
