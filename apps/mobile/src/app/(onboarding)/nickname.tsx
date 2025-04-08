import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { Input } from 'tamagui';

import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';

import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useStepProgress } from '@/core/store/step-progress.store';
import { useUser } from '@/core/store/user.store';

import * as S from '@/styles/screens/onboarding/Nickname.styled';

export default function Screen() {
  const { draftUserName, onDraftUserNameChange } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress();

  const handlePrevStep = () => {
    if (currentStep === 1) {
      goToPrevStep();
      router.back();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      goToNextStep();
      router.push('/signup');
    }
  };

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <S.Title>{t('onboarding.nickname.title')}</S.Title>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.Description>{t('onboarding.nickname.description')}</S.Description>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <Input
            value={draftUserName}
            onChangeText={onDraftUserNameChange}
            placeholder={t('onboarding.nickname.placeholder')}
          />
        </FadeIn>
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
          <S.PrevButton icon={ArrowLeft} onPress={handlePrevStep}>
            {t('common.button.prev')}
          </S.PrevButton>
          <S.NextButton
            disabled={!draftUserName}
            onPress={handleNextStep}
            iconAfter={ArrowRight}
          >
            {t('common.button.next')}
          </S.NextButton>
        </S.ButtonContainer>
      </FadeIn>
    </ViewContainer>
  );
}
