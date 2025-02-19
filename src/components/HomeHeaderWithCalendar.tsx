import { H1, H2, XStack, YStack } from 'tamagui';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { ShakeHand } from '@/components/ShakeHand';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import React from 'react';
import { useUser } from '@/store/hooks/useUser';
import { HOME_HEADER_LINE_HEIGHT } from '@/constants/size';

export const HomeHeaderWithCalendar = () => {
  const { userInfo } = useUser();

  return (
    <YStack gap="$3">
      <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
        <XStack gap="$2" items="flex-end">
          <H1 lineHeight={HOME_HEADER_LINE_HEIGHT}>Hello</H1>
          <H2 lineHeight={HOME_HEADER_LINE_HEIGHT}>{userInfo?.userName}</H2>
          <ShakeHand duration={3000} />
        </XStack>
      </FadeIn>
      <WeekDayPicker />
    </YStack>
  );
};
