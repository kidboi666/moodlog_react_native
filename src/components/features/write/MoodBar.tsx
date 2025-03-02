import { View } from 'tamagui';
import { emotionTheme } from '@/constants/themes';
import React from 'react';
import { Emotion } from '@/types/entries';

interface Props {
  emotion?: Emotion;
}

export const MoodBar = ({ emotion }: Props) => {
  return emotion ? (
    <View
      animation="medium"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      width="3%"
      height="100%"
      borderTopLeftRadius="$4"
      borderBottomLeftRadius="$4"
      bg={emotionTheme[emotion?.type][emotion?.level]}
    />
  ) : (
    <View
      animation="medium"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      width="3%"
      height="100%"
      borderBottomLeftRadius="$4"
      borderTopLeftRadius="$4"
      bg="$gray8"
    />
  );
};
