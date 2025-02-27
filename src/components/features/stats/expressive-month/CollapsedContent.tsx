import { useTranslation } from 'react-i18next';
import { Button, H1, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { getExpressiveMonthString } from '@/utils/common';
import { ExpressiveMonth } from '@/types/entries';

interface Props {
  expressiveMonth: ExpressiveMonth;
  isExpanded: boolean;
}

export const CollapsedContent = ({ expressiveMonth, isExpanded }: Props) => {
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
        <H3>{t('records.stats.expressiveMonth.title')}</H3>
        <Text>{t('records.stats.expressiveMonth.description')}</Text>
      </YStack>
      <XStack>
        <XStack flex={1}>
          <H1>
            {expressiveMonth.count
              ? t(
                  `calendar.months.${getExpressiveMonthString(expressiveMonth.month)}`,
                )
              : t('common.fallback.text')}
          </H1>
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
