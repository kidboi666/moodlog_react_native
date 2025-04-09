import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { Input } from 'tamagui';

import { ArrowLeft, ArrowRight, Eye, EyeOff } from '@tamagui/lucide-icons';

import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useStepProgress } from '@/core/store/step-progress.store';
import { useUser } from '@/core/store/user.store';

import * as S from '@/styles/screens/onboarding/Nickname.styled';

export default function Screen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const draftPassword = useUser(state => state.draftPassword);
  const onDraftPasswordChange = useUser(state => state.onDraftPasswordChange);
  const router = useRouter();
  const { t } = useTranslation();
  const { currentStep, goToPrevStep, goToNextStep } = useStepProgress();

  const handlePrevStep = () => {
    if (currentStep === 3) {
      goToPrevStep();
      router.back();
    }
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      goToNextStep();
      router.push('/signup');
    }
  };

  const isValidPassword = () => {
    return draftPassword.length >= 8;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <S.Title>{t('onboarding.password.title')}</S.Title>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.Description>{t('onboarding.password.description')}</S.Description>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[2]}>
          <S.InputContainer>
            <Input
              value={draftPassword}
              onChangeText={onDraftPasswordChange}
              placeholder={t('onboarding.password.placeholder')}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              flex={1}
            />
            <S.PasswordIcon onPress={togglePasswordVisibility}>
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </S.PasswordIcon>
          </S.InputContainer>
        </FadeIn>
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
          <S.PrevButton icon={ArrowLeft} onPress={handlePrevStep}>
            {t('common.button.prev')}
          </S.PrevButton>
          <S.NextButton
            disabled={!isValidPassword()}
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
