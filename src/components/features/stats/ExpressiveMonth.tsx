import { Button, H1, H3, Text, useEvent, XStack, YStack } from 'tamagui';
import { getExpressiveMonthString } from '@/utils/common/date';
import { useTranslation } from 'react-i18next';
import { JournalStats } from '@/types/entries';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useState } from 'react';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';

interface Props {
  journalStats: JournalStats;
}

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const ExpressiveMonth = ({ journalStats }: Props) => {
  const { t } = useTranslation();
  const expressiveMonth = getExpressiveMonthString(
    journalStats.expressiveMonth.month,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      isExpanded ? RECORD_CARD_EXPANDED_HEIGHT : RECORD_CARD_HEIGHT,
    ),
  }));

  return (
    <AnimatedCard
      flex={1}
      bg="$gray5"
      rounded="$8"
      justify="space-between"
      p="$4"
      onPress={onPress}
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      style={animatedStyle}
    >
      <YStack>
        <H3>{t('record.stats.bestMonth.title')}</H3>
        <Text>{t('record.stats.bestMonth.description')}</Text>
      </YStack>
      <XStack>
        <XStack flex={1}>
          <H1>
            {expressiveMonth
              ? t(`calendar.months.${expressiveMonth}`)
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
    </AnimatedCard>
  );
};
