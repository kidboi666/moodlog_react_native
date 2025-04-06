import { SignatureMood } from '@/types/mood.types';
import { Nullable } from '@/types/utill.types';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import * as S from 'src/core/components/features/statistics/mood-average/CollapsedContent.styled';
import { XStack, YStack } from 'tamagui';

interface Props {
  hasSignatureMood: boolean;
  signatureMood: Nullable<SignatureMood>;
}

export const CollapsedContent = ({
  hasSignatureMood,
  signatureMood,
}: Props) => {
  const { t } = useTranslation();
  return (
    <S.ViewContainer>
      <S.YStackContainer>
        <S.CardTitle signatureMood={hasSignatureMood}>
          {t('statistics.mood.title')}
        </S.CardTitle>
        <S.CardDescription signatureMood={hasSignatureMood}>
          {t('statistics.mood.description')}
        </S.CardDescription>
      </S.YStackContainer>
      <YStack>
        <XStack>
          <S.MoodText signatureMood={hasSignatureMood}>
            {hasSignatureMood
              ? t(`moods.types.${signatureMood?.type}`)
              : t('common.fallback.text')}
          </S.MoodText>
          <S.MaximizeButton icon={Maximize2} />
        </XStack>
      </YStack>
    </S.ViewContainer>
  );
};
