import { H3, View, XStack } from 'tamagui';
import { ShakeEmoji } from '@/components/ShakeEmoji';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const MoodSelectTitle = () => {
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
      <XStack>
        <ShakeEmoji emoji="🫥" duration={3000} />
      </XStack>
      <H3 fontWeight="800">{t('placeholders.emotion')}</H3>
    </View>
  );
};
