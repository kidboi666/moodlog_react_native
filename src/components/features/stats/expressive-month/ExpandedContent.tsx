import { useTranslation } from 'react-i18next';
import { Button, H5, Text, View, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';
import { SelectedMonthStats } from '@/types/entries';
import { getMonthStringWithoutYear } from '@/utils/common';

interface Props {
  selectedMonthStats: SelectedMonthStats;
  isExpanded: boolean;
}

export const ExpandedContent = ({ selectedMonthStats, isExpanded }: Props) => {
  const { t } = useTranslation();
  const {
    month: ISOMonthString,
    count,
    activeDay,
    frequency,
  } = selectedMonthStats;

  if (!count) {
    return <EmptyExpandedContent />;
  }

  const month = t(
    `calendar.months.${getMonthStringWithoutYear(ISOMonthString)}`,
  );
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
        <H5 fontWeight="800">
          {t('records.stats.currentMonth.journalCount.title', {
            month,
          })}
        </H5>
        <Text color="$gray11">
          {t(`records.stats.currentMonth.journalCount.description`, {
            count,
          })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.currentMonth.frequency.title', { month })}
        </H5>
        <Text color="$gray11">
          {frequency === 0
            ? t('records.stats.currentMonth.frequency.everyDay', { month })
            : t('records.stats.currentMonth.frequency.description', {
                date: frequency,
                month,
              })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.currentMonth.mostDay.title', { month })}
        </H5>
        <Text color="$gray11">
          {t('records.stats.currentMonth.mostDay.description', {
            day: t(`calendar.days.${activeDay}`),
            month,
          })}
        </Text>
      </YStack>
      <Button
        unstyled
        self="flex-end"
        opacity={0.2}
        icon={isExpanded ? <Minimize2 size="$1" /> : <Maximize2 size="$1" />}
      />
    </View>
  );
};
