import { Button } from 'tamagui';
import React from 'react';
import { Emotion } from '@/types/entries';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';

interface Props {
  emotion?: Emotion;
}

export const NextButton = ({ emotion }: Props) => {
  return (
    <Button
      unstyled
      bg="$gray12"
      rounded="$12"
      p="$6"
      disabled={!emotion}
      color={!emotion ? '$gray6' : '$gray1'}
      onPress={() => router.push('/write/journal_write')}
      icon={<ArrowRight size="$1" />}
      animation="bouncy"
      animateOnly={ENTER_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      enterStyle={ENTER_STYLE}
    />
  );
};
