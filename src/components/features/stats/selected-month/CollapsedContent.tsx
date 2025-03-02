import { useTranslation } from 'react-i18next';
import { H2, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2 } from '@tamagui/lucide-icons';
import { getMonthStringWithoutYear } from '@/utils/common';
import { SelectedMonthStats } from '@/types/entries';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';

interface Props {
  selectedMonthStats: SelectedMonthStats;
}

export const CollapsedContent = ({ selectedMonthStats }: Props) => {
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
          <H2>{count}</H2>
          <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
            {t('common.units.count')}
          </Text>
        </XStack>
        <Maximize2 size="$1" self="flex-end" opacity={0.6} />
      </XStack>
    </View>
  );
};
