import { useTranslation } from 'react-i18next';
import { View, XStack } from 'tamagui';

import * as S from 'src/core/components/features/write/MoodSelectTitle.styled';

import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';

export const MoodSelectTitle = () => {
  const { t } = useTranslation();
  return (
    <View>
      <XStack>
        <ShakeEmoji emoji="🫥" duration={3000} />
      </XStack>
      <S.Title>{t('placeholders.mood')}</S.Title>
    </View>
  );
};
