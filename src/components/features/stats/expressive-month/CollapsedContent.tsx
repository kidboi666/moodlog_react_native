import { useTranslation } from 'react-i18next';
import { Button, H1, H3, Text, View, XStack, YStack } from 'tamagui';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';

export const CollapsedContent = ({ expressiveMonthString, isExpanded }) => {
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
        <H3>{t('record.stats.expressiveMonth.title')}</H3>
        <Text>{t('record.stats.expressiveMonth.description')}</Text>
      </YStack>
      <XStack>
        <XStack flex={1}>
          <H1>
            {expressiveMonthString
              ? t(`calendar.months.${expressiveMonthString}`)
              : t('fallback.text')}
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
