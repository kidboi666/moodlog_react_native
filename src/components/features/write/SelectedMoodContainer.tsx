import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';
import { H2, XStack } from 'tamagui';
import React from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';

interface Props {
  emotion: Emotion;
}

export const SelectedMoodContainer = ({ emotion }: Props) => {
  const { t } = useTranslation();
  return (
    <XStack
      gap="$2"
      justify="center"
      animation="bouncy"
      position="absolute"
      animateOnly={ENTER_STYLE_KEY}
      enterStyle={ENTER_STYLE}
      exitStyle={ENTER_STYLE}
    >
      <H2 color="$gray11">{t(`emotions.levels.${emotion.level}`)}</H2>
      <H2>{t(`emotions.types.${emotion.type}`)}</H2>
    </XStack>
  );
};
