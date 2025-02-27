import { Button, H1, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';
import { JournalStats } from '@/types/entries';

interface Props {
  isExpanded: boolean;
  journalStats: JournalStats;
}

export const CollapsedContent = ({ isExpanded, journalStats }: Props) => {
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
        <H3>{t('records.stats.totalCount.title')}</H3>
        <Text>{t('records.stats.totalCount.description')}</Text>
      </YStack>
      <XStack>
        <XStack items="flex-end" gap="$2" flex={1}>
          <H1>{journalStats.totalCount}</H1>
          <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
            {t('common.units.count')}
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
