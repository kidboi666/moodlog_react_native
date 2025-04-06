import { ShakeEmoji } from '@/core/components/shared/ShakeEmoji';
import { useTranslation } from 'react-i18next';
import * as S from 'src/core/components/features/write/MoodSelectTitle.styled';
import { View, XStack } from 'tamagui';

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
