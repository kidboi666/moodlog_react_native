import { H2, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Nullable } from '@/types/utils';

interface Props {
  hasSignatureEmotion: boolean;
  signatureEmotion: Nullable<SignatureEmotion>;
}

export const CollapsedContent = ({
  hasSignatureEmotion,
  signatureEmotion,
}: Props) => {
  const { t } = useTranslation();
  return (
    <View
      animation="quick"
      animateOnly={['opacity']}
      justify="space-between"
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack gap="$2">
        <H3 color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.title')}
        </H3>
        <Text color={hasSignatureEmotion ? '$gray1' : '$gray12'}>
          {t('records.stats.emotion.description')}
        </Text>
      </YStack>
      <YStack>
        <XStack>
          <H2 color={hasSignatureEmotion ? '$gray1' : '$gray12'} flex={1}>
            {hasSignatureEmotion
              ? t(`emotions.types.${signatureEmotion?.type}`)
              : t('common.fallback.text')}
          </H2>
          <Maximize2 size="$1" self="flex-end" color="$gray1" opacity={0.6} />
        </XStack>
      </YStack>
    </View>
  );
};
