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
    <YStack gap="$3">
      <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
        <XStack gap="$2" items="flex-end">
          <H2 lineHeight={HOME_HEADER_LINE_HEIGHT}>{t('hello')}</H2>
          <ShakeHand duration={2000} />
        </XStack>
        <H3>{t('greeting', { name: userInfo?.userName })}</H3>
      </FadeIn>
      <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
        <H4 color="$gray11">{t('howAreYou')}</H4>
      </FadeIn>
      <WeekDayPicker />
    </YStack>
  );
};
