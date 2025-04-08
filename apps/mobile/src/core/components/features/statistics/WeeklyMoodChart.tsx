import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { H3, Text, YStack } from 'tamagui';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import * as S from 'src/core/components/features/statistics/MoodChart.styled';

import { WEEK_DAY } from '@/core/constants/date';
import { useWeeklyMoodStats } from '@/core/hooks/useWeeklyMoodStats';

import { getISODateFromMonthString } from '@/utils/date';

import { ISOMonthString } from '@/types/date.types';
import { MoodLevel } from '@/types/mood.types';

import { ChartItem } from './ChartItem';

const AnimatedBox = Animated.createAnimatedComponent(S.AnimatedBox);
const AnimatedText = Animated.createAnimatedComponent(S.AnimatedText);

interface Props {
  selectedMonth: ISOMonthString;
}

export const WeeklyMoodChart = ({ selectedMonth }: Props) => {
  const now = new Date();
  const date = now.getDate();
  const dateString = getISODateFromMonthString(selectedMonth, date);
  const { t } = useTranslation();
  const { stats } = useWeeklyMoodStats(dateString);

  const days = Array(7)
    .fill(0)
    .map(() => useSharedValue(0));

  const animatedStyles = days.map(day =>
    useAnimatedStyle(() => ({
      opacity: day.value,
      transform: [{ translateY: (1 - day.value) * 20 }],
    })),
  );

  useEffect(() => {
    setTimeout(() => {
      days.forEach((day, index) => {
        day.value = withDelay(
          index * 100,
          withTiming(1, {
            duration: 800,
            easing: Easing.inOut(Easing.quad),
          }),
        );
      });
    }, 1000);
  }, []);

  return (
    <S.YStackContainer>
      <H3>{t('statistics.weeklyMood.title')}</H3>
      <Text>{t('statistics.weeklyMood.description')}</Text>

      <YStack>
        {Object.keys(WEEK_DAY).map((day, index) => {
          let percentages;
          switch (stats[day]?.level) {
            case MoodLevel.ZERO: {
              percentages = 25;
              break;
            }
            case MoodLevel.HALF: {
              percentages = 110;
              break;
            }
            case MoodLevel.FULL: {
              percentages = 220;
              break;
            }
            default:
              percentages = 0;
          }
          return (
            <AnimatedBox key={index} style={animatedStyles[index]}>
              <AnimatedText>{t(`calendar.daysShort.${day}`)}</AnimatedText>
              <S.ChartBox>
                <ChartItem
                  type={stats[day]?.type}
                  level={stats[day]?.level}
                  percentage={percentages}
                />
              </S.ChartBox>
            </AnimatedBox>
          );
        })}
      </YStack>
    </S.YStackContainer>
  );
};
