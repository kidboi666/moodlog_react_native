import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { YStack } from 'tamagui';

import Animated, { BounceInUp, Easing } from 'react-native-reanimated';

import * as S from 'src/core/components/features/home/WeekDay.styled';

import { HorizontalCalendar } from '@/core/components/features/home/HorizontalCalendar';

import { getMonthKey } from '@/utils/date';

const AnimatedContainer = Animated.createAnimatedComponent(YStack);

export const WeekDay = memo(() => {
  const { t } = useTranslation();

  return (
    <AnimatedContainer
      entering={BounceInUp.duration(700).easing(Easing.inOut(Easing.quad))}
    >
      <S.OuterGradientBox>
        <S.InnerGradientBox>
          <S.CurrentMonthBox>
            <S.CurrentMonthText>
              {t(`calendar.months.${getMonthKey(new Date().getMonth())}`)}.
            </S.CurrentMonthText>
          </S.CurrentMonthBox>
          <HorizontalCalendar />
        </S.InnerGradientBox>
      </S.OuterGradientBox>
    </AnimatedContainer>
  );
});
