import { Button, Card, H1, H3, Text, useEvent, XStack } from 'tamagui';
import { emotionTheme } from '@/constants/themes';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Maximize2 } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useState } from 'react';
import {
  RECORD_CARD_EXPANDED_HEIGHT,
  RECORD_CARD_HEIGHT,
} from '@/constants/size';

interface Props {
  signatureEmotion: SignatureEmotion;
}

const AnimatedCard = Animated.createAnimatedComponent(Card);

export const EmotionAverage = ({ signatureEmotion }: Props) => {
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
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      bg={emotionTheme[signatureEmotion.type].full}
      rounded="$8"
      onPress={onPress}
      style={animatedStyle}
      flex={1}
    >
      <Card.Header>
        <H3>{t('record.stats.emotion.title')}</H3>
        <Text>{t('record.stats.emotion.description')}</Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1}>
          <H1>{t(`emotion.type.${signatureEmotion.type}`)}</H1>
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
