import { useTranslation } from 'react-i18next';
import { Button, H5, Text, View, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';
import { ExpressiveMonthStats } from '@/types/entries';
import { getMonthStringWithoutYear } from '@/utils/common';

interface Props {
  isExpanded: boolean;
  totalFrequency: number;
  totalActiveDay: string;
  totalCount: number;
  daysSinceSignup: number;
  expressiveMonthStats: ExpressiveMonthStats;
}

export const ExpandedContent = ({
  isExpanded,
  totalFrequency,
  totalActiveDay,
  totalCount,
  daysSinceSignup,
  expressiveMonthStats,
}: Props) => {
  const { t } = useTranslation();
  if (!totalCount) {
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
        <H5 fontWeight="800">
          {t('records.stats.totalCount.daysSinceSignup.title')}
        </H5>
        <Text color="$gray11">
          {t('records.stats.totalCount.daysSinceSignup.description', {
            date: daysSinceSignup,
          })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.totalCount.frequency.title')}
        </H5>
        <Text color="$gray11">
          {totalFrequency === 0
            ? t('records.stats.totalCount.frequency.everyDay')
            : t('records.stats.totalCount.frequency.description', {
                date: totalFrequency,
              })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">{t('records.stats.totalCount.mostDay.title')}</H5>
        <Text color="$gray11">
          {t('records.stats.totalCount.mostDay.description', {
            day: t(`calendar.days.${totalActiveDay}`),
          })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.totalCount.expressiveMonth.title')}
        </H5>
        <Text color="$gray11">
          {t('records.stats.totalCount.expressiveMonth.description', {
            month: t(
              `calendar.months.${getMonthStringWithoutYear(expressiveMonthStats.month)}`,
            ),
            count: expressiveMonthStats.count,
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
