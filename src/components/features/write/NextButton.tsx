import { Button, View } from 'tamagui';
import React from 'react';
import { Emotion } from '@/types/entries';
import { router } from 'expo-router';
import { ArrowRight } from '@tamagui/lucide-icons';
import { ENTER_STYLE } from '@/constants/styles';

interface Props {
  emotion?: Emotion;
}

export const NextButton = ({ emotion }: Props) => {
  return (
    <View items="center">
      <Button
        animation="bouncy"
        disabled={!emotion}
        onPress={() => router.push('/write/journal_write')}
        icon={<ArrowRight size="$1" />}
        enterStyle={ENTER_STYLE}
      />
    </View>
  );
};
