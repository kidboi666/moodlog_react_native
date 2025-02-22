import { Button, Card, H1, H3, Text, useEvent, XStack } from 'tamagui';
import { RECORD_UNIT_LINE_HEIGHT } from '@/constants/size';
import { useTranslation } from 'react-i18next';
import { Maximize2 } from '@tamagui/lucide-icons';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedCard = Animated.createAnimatedComponent(Card);

export const TotalCount = ({ journalStats }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = useEvent(() => {
    setIsExpanded(prev => !prev);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: withSpring(isExpanded ? 360 : 180),
  }));

  return (
    <AnimatedCard
      unstyled
      style={animatedStyle}
      bg="$gray5"
      rounded="$8"
      onPress={onPress}
    >
      <Card.Header padded>
        <H3 fontWeight="800">{t('record.stats.totalCount.title')}</H3>
        <Text>{t('record.stats.totalCount.description')}</Text>
      </Card.Header>
      <Card.Footer padded>
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
          icon={<Maximize2 size="$1" />}
        />
      </Card.Footer>
    </AnimatedCard>
  );
};
