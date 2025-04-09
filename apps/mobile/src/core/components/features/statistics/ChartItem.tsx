import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from '@/core/components/features/statistics/MoodChart.styled';
import { moodTheme } from '@/core/constants/themes';

import { MoodLevel, MoodType } from '@/types/mood.types';

const AnimatedChartItem = Animated.createAnimatedComponent(S.ChartItem);

interface Props {
  type?: MoodType;
  level?: MoodLevel;
  percentage: number;
}

export const ChartItem = ({ type, level, percentage }: Props) => {
  const widthValue = useSharedValue(0);
  const { t } = useTranslation();
  const animatedStyles = useAnimatedStyle(() => ({
    width: widthValue.value,
  }));

  useEffect(() => {
    if (percentage > 0) {
      setTimeout(() => {
        widthValue.value = withTiming(percentage, {
          duration: 2000,
        });
      }, 1000);
    }
  }, [percentage]);

  if (!type || !level) return null;

  return (
    <S.ChartItemContainer>
      <AnimatedChartItem
        style={animatedStyles}
        moodColor={moodTheme[type][MoodLevel.FULL]}
      />
      <S.PercentageText>{t(`moods.levels.${level}`)}</S.PercentageText>
      <S.PercentageText>{t(`moods.types.${type}`)}</S.PercentageText>
    </S.ChartItemContainer>
  );
};
