import { Button, View } from 'tamagui';
import React from 'react';
import { Emotion } from '@/types/entries';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { ENTER_STYLE, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

interface Props {
  emotion?: Emotion;
}

export const NextButton = ({ emotion }: Props) => {
  return (
    <View items="center">
      <Button
        unstyled
        p="$4"
        bg="$gray12"
        color="$gray1"
        rounded="$4"
        animation="quick"
        disabled={!emotion}
        onPress={() => router.push('/write/journal_write')}
        icon={<ArrowRight size="$1" />}
        animateOnly={PRESS_STYLE_KEY}
        pressStyle={PRESS_STYLE}
        enterStyle={ENTER_STYLE}
      />
    </View>
  );
};
