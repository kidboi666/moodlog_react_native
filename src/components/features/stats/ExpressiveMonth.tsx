import { Button, Card, H1, H3, Text, useEvent, XStack } from 'tamagui';
import { getExpressiveMonthString } from '@/utils/common/date';
import { useTranslation } from 'react-i18next';
import { JournalStats } from '@/types/entries';
import { Maximize2 } from '@tamagui/lucide-icons';
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

const AnimatedCard = Animated.createAnimatedComponent(Card);

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
      unstyled
      flex={1}
      bg="$gray5"
      rounded="$8"
      onPress={onPress}
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      style={animatedStyle}
    >
      <Card.Header>
        <H3>{t('record.stats.bestMonth.title')}</H3>
        <Text>{t('record.stats.bestMonth.description')}</Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1}>
          <H1>{t(`calendar.months.${expressiveMonth}`)}</H1>
        </XStack>
        <Button
          unstyled
          self="flex-end"
          opacity={0.2}
          bg="transparent"
          icon={<Maximize2 size="$1" />}
        />
      </Card.Footer>
    </AnimatedCard>
  );
};
