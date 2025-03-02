import { ENTER_STYLE, ENTER_STYLE_KEY } from '@/constants/styles';
import { H2, View, XStack } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';
import { Nullable } from '@/types/utils';

interface Props {
  emotion: Nullable<Emotion>;
}

export const SelectedMoodContainer = ({ emotion }: Props) => {
  const [animationKey, setAnimationKey] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    setAnimationKey(key => key + 1);
  }, [emotion?.type, emotion?.level]);

  return (
    <View flex={1} items="center" justify="center">
      <XStack
        key={animationKey}
        gap="$2"
        justify="center"
        animation="bouncy"
        position="absolute"
        animateOnly={ENTER_STYLE_KEY}
        enterStyle={ENTER_STYLE}
        exitStyle={ENTER_STYLE}
      >
        <H2 color="$gray11">
          {emotion ? t(`emotions.levels.${emotion.level}`) : '??'}
        </H2>
        <H2>{emotion ? t(`emotions.types.${emotion.type}`) : '??'}</H2>
      </XStack>
    </View>
  );
};
