import { Button, View } from 'tamagui';
import React from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

interface Props {
  emotion?: Emotion;
}

export const NextButton = ({ emotion }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      animation="bouncy"
      enterStyle={{
        opacity: 0,
        y: 10,
      }}
      exitStyle={{
        opacity: 0,
        y: 10,
      }}
    >
      <Button
        themeInverse={!!emotion}
        disabled={!emotion}
        fontWeight="800"
        color={!emotion ? '$gray10' : '$gray12'}
        onPress={() => router.push('/write/journal_write')}
      >
        {t('common.button.next')}
      </Button>
    </View>
  );
};
