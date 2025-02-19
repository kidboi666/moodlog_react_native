import { H1, H2, XStack, YStack } from 'tamagui';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { ShakeHand } from '@/components/ShakeHand';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import React from 'react';
import { useUser } from '@/store/hooks/useUser';

export const HomeHeaderWithCalendar = () => {
  const { userInfo } = useUser();
  return (
    <YStack gap="$3">
      <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
        <XStack gap="$2" items="flex-end">
          <H1>Hello</H1>
          <H2>{userInfo?.userName}.</H2>
          <ShakeHand />
        </XStack>
      </FadeIn>
      <WeekDayPicker />
    </YStack>
  );
};
