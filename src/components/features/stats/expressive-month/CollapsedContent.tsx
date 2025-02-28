import { useTranslation } from 'react-i18next';
import { Button, H1, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { getMonthStringWithoutYear } from '@/utils/common';
import { SelectedMonthStats } from '@/types/entries';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';

interface Props {
  selectedMonthStats: SelectedMonthStats;
  isExpanded: boolean;
}

export const CollapsedContent = ({ selectedMonthStats, isExpanded }: Props) => {
  const { t } = useTranslation();
  const { month: ISOMonthString, count } = selectedMonthStats ?? null;
  const month = getMonthStringWithoutYear(ISOMonthString);
  return (
    <View
      p="$4"
      animation="quick"
      animateOnly={['opacity']}
      justify="space-between"
      flex={1}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
    >
      <YStack gap="$2">
        <H3>
          {t('records.stats.currentMonth.title', {
            month: t(`calendar.months.${month}`),
          })}
        </H3>
        <Text>{t('records.stats.currentMonth.description')}</Text>
      </YStack>
      <XStack>
        <XStack flex={1} items="flex-end" gap="$2">
          <H1>{count}</H1>
          <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
            {t('common.units.count')}
          </Text>
        </XStack>
        <Button
          unstyled
          self="flex-end"
          opacity={0.2}
          bg="transparent"
          icon={isExpanded ? <Minimize2 size="$1" /> : <Maximize2 size="$1" />}
        />
      </XStack>
    </View>
  );
};
