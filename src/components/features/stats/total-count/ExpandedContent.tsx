import { useTranslation } from 'react-i18next';
import { Button, H5, Text, View, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { EmptyExpandedContent } from '@/components/features/stats/EmptyExpandedContent';

interface Props {
  isExpanded: boolean;
  totalFrequency: number;
  totalActiveDay: string;
}

export const ExpandedContent = ({
  isExpanded,
  totalFrequency,
  totalActiveDay,
}: Props) => {
  const { t } = useTranslation();
  if (!totalFrequency) {
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
          {t('records.stats.expressiveMonth.frequency.title')}
        </H5>
        <Text color="$gray11">
          {t('records.stats.expressiveMonth.frequency.description', {
            date: totalFrequency,
          })}
        </Text>
      </YStack>
      <YStack gap="$2">
        <H5 fontWeight="800">
          {t('records.stats.expressiveMonth.mostDay.title')}
        </H5>
        <Text color="$gray11">
          {t('records.stats.expressiveMonth.mostDay.description', {
            day: t(`calendar.days.${totalActiveDay}`),
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
