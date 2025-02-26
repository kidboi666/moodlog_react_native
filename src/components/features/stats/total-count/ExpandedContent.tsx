import { Button, H1, H3, Text, View, XStack, YStack } from 'tamagui';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';

export const ExpandedContent = ({ journalStats, isExpanded }) => {
  const { t } = useTranslation();

  if (journalStats.totalCount === 0) {
    return <EmptyExpandedContent />;
  }

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
        <H3>{t('records.stats.totalCount.title')}</H3>
        <Text>{t('records.stats.totalCount.description')}</Text>
      </YStack>
      <XStack>
        <XStack items="flex-end" gap="$2" flex={1}>
          <H1>{journalStats.totalCount}</H1>
          <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
            {t('records.stats.totalCount.unit')}
          </Text>
        </XStack>
        <Button
          unstyled
          self="flex-end"
          bg="transparent"
          opacity={0.2}
          icon={isExpanded ? <Minimize2 size="$1" /> : <Maximize2 size="$1" />}
        />
      </XStack>
    </View>
  );
};
