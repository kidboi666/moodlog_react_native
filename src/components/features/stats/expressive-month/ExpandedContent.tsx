import { useTranslation } from 'react-i18next';
import { Button, H5, Text, View, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';
import { ExpressiveMonth } from '@/types/entries';
import { getExpressiveMonthString } from '@/utils/common';

interface Props {
  expressiveMonth: ExpressiveMonth;
  isExpanded: boolean;
  monthlyFrequency: number;
  monthlyActiveDay: string;
}

export const ExpandedContent = ({
  expressiveMonth,
  isExpanded,
  monthlyFrequency,
  monthlyActiveDay,
}: Props) => {
  const { t } = useTranslation();
  if (!expressiveMonth.month) {
    return <EmptyExpandedContent />;
  }
  const month = t(
    `calendar.months.${getExpressiveMonthString(expressiveMonth.month)}`,
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
          {t('records.stats.expressiveMonth.journalCount.title', {
            month,
          })}
        </H5>
        <Text color="$gray11">
          {t(`records.stats.expressiveMonth.journalCount.description`, {
            count: expressiveMonth.count,
          })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.expressiveMonth.frequency.title', { month })}
        </H5>
        <Text color="$gray11">
          {monthlyFrequency === 0
            ? t('records.stats.expressiveMonth.frequency.everyDay', { month })
            : t('records.stats.expressiveMonth.frequency.description', {
                date: monthlyFrequency,
                month,
              })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.expressiveMonth.mostDay.title', { month })}
        </H5>
        <Text color="$gray11">
          {t('records.stats.expressiveMonth.mostDay.description', {
            day: t(`calendar.days.${monthlyActiveDay}`),
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
