import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { H1, YStack } from 'tamagui';

import { ArrowLeft } from '@tamagui/lucide-icons';

import { FadeIn } from '@/core/components/shared/FadeIn.styleable';
import { ViewContainer } from '@/core/components/shared/ViewContainer.styleable';
import { AUTH_SNAP_POINTS } from '@/core/constants/size';
import { ANIMATION_DELAY_SECONDS } from '@/core/constants/time';
import { useBottomSheet } from '@/core/store/bottom-sheet.store';
import { useStepProgress } from '@/core/store/step-progress.store';
import { useUser } from '@/core/store/user.store';

import { BottomSheetType } from '@/types/bottom-sheet.types';

import * as S from '@/styles/screens/onboarding/Signup.styled';

export default function Screen() {
  const router = useRouter();
  const { goToPrevStep, goToNextStep, currentStep } = useStepProgress();
  const draftUserName = useUser(state => state.draftUserName);
  const registerUser = useUser(state => state.registerUser);
  const { t } = useTranslation();
  const { showBottomSheet } = useBottomSheet();
  const isBenefitPage = currentStep === 2;

  const handlePrevStep = () => {
    if (isBenefitPage) {
      goToPrevStep();
      router.back();
    }
  };

  const handleNextStep = () => {
    if (isBenefitPage) {
      goToNextStep();
      showBottomSheet(BottomSheetType.SIGN_UP, AUTH_SNAP_POINTS);
    }
  };

  const skipStep = async () => {
    await registerUser(draftUserName);
    router.replace('/(tabs)');
  };

  return (
    <ViewContainer edges={['bottom']}>
      <S.YStackContainer>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[0]}>
          <H1>{t('onboarding.benefits.title')}</H1>
        </FadeIn>
        <FadeIn delay={ANIMATION_DELAY_SECONDS[1]}>
          <S.BenefitsContainer>
            <S.BenefitTitle>{t('onboarding.benefits.ota')}</S.BenefitTitle>
            <S.BenefitsBox>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.sync')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.backup')}
              </S.BenefitText>
              <S.BenefitText>
                • {t('onboarding.benefits.benefits.profile')}
              </S.BenefitText>
            </S.BenefitsBox>
          </S.BenefitsContainer>
        </FadeIn>
        <S.RestBox />
      </S.YStackContainer>
      <FadeIn delay={ANIMATION_DELAY_SECONDS[3]}>
        <S.ButtonContainer>
          <S.PrevButton onPress={handlePrevStep} icon={ArrowLeft}>
            {t('common.prev')}
          </S.PrevButton>
          <YStack>
            <FadeIn delay={ANIMATION_DELAY_SECONDS[4]}>
              <S.SkipButton color="$blue10" onPress={skipStep}>
                {t('common.skip')}
              </S.SkipButton>
            </FadeIn>

            <S.ConfirmButton onPress={handleNextStep}>
              {t('common.join')}
            </S.ConfirmButton>
          </YStack>
        </S.ButtonContainer>
      </FadeIn>
    </ViewContainer>
  );
}
