import { Button, H1, H3, Text, useEvent, XStack, YStack } from 'tamagui';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
  RECORD_UNIT_LINE_HEIGHT,
} from '@/constants/size';
import { useTranslation } from 'react-i18next';
import { Maximize2, Minimize2 } from '@tamagui/lucide-icons';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

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
      <YStack gap="$2">
        <H3>{t('record.stats.totalCount.title')}</H3>
        <Text>{t('record.stats.totalCount.description')}</Text>
      </YStack>
      <XStack>
        <XStack items="flex-end" gap="$2" flex={1}>
          <H1>{journalStats.totalCount}</H1>
          <Text lineHeight={RECORD_UNIT_LINE_HEIGHT} color="$gray11">
            {t('record.stats.totalCount.unit')}
          </Text>
        </XStack>
        <Button
          unstyled
          self="flex-end"
          bg="transparent"
          opacity={0.2}
          icon={isExpanded ? <Minimize2 size="$1" /> : <Maximize2 size="$1" />}
        />
      </XStack>
    </AnimatedCard>
  );
};
