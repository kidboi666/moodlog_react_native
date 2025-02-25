import { AnimatePresence, useEvent, YStack } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { ExpandedContent } from '@/components/features/stats/total-count/ExpandedContent';
import { CollapsedContent } from '@/components/features/stats/total-count/CollapsedContent';

const AnimatedCard = Animated.createAnimatedComponent(YStack);

export const TotalCount = ({ journalStats }) => {
  const { t } = useTranslation();
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
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedContent
            isExpanded={isExpanded}
            journalStats={journalStats}
          />
        ) : (
          <CollapsedContent
            isExpanded={isExpanded}
            journalStats={journalStats}
          />
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
