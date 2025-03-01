import { H2, H3, H4, XStack, YStack } from 'tamagui';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { ShakeHand } from '@/components/ShakeHand';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import React from 'react';
import { useUser } from '@/store/hooks/useUser';
import { HOME_HEADER_LINE_HEIGHT } from '@/constants/size';
import { useTranslation } from 'react-i18next';

export const HomeHeaderWithCalendar = () => {
  const { userInfo } = useUser();
  const { t } = useTranslation();

  return (

  );
};
