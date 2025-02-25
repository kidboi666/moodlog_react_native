import { useTranslation } from 'react-i18next';
import { Button, H5, Text, View, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';

export const ExpandedContent = ({
  expressiveMonthString,
  expressiveMonth,
  isExpanded,
}) => {
  const { t } = useTranslation();
  if (!expressiveMonth.month) {
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
          {t('record.stats.expressiveMonth.journalCount', {
            month: t(`calendar.months.${expressiveMonthString}`),
          })}
        </H5>
        <Text color="$gray11">{`${expressiveMonth.count}${t('units.count')}`}</Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('record.stats.expressiveMonth.frequency.title')}
        </H5>
        <Text color="$gray11">
          {t('record.stats.expressiveMonth.frequency.description')}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('record.stats.expressiveMonth.mostDay.title')}
        </H5>
        <Text color="$gray11">
          {t('record.stats.expressiveMonth.mostDay.description')}
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
