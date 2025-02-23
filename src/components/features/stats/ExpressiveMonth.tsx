import { Button, H1, H3, H5, Text, useEvent, XStack, YStack } from 'tamagui';
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
import { getExpressiveMonthString } from '@/utils/common';

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

  const expandedContent = () => (
    <>
      <YStack>
        <H5 fontWeight="800">
          {t('record.stats.expressiveMonth.journalCount', {
            month: t(`calendar.months.${expressiveMonth}`),
          })}
        </H5>
        <Text color="$gray11">21개</Text>
      </YStack>
      <YStack>
        <H5 fontWeight="800">
          {t('record.stats.expressiveMonth.frequency.title')}
        </H5>
        <Text color="$gray11">
          {t('record.stats.expressiveMonth.frequency.description')}
        </Text>
      </YStack>
      <YStack>
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
    </>
  );

  const collapsedContent = () => (
    <>
      <YStack>
        <H3>{t('record.stats.expressiveMonth.title')}</H3>
        <Text>{t('record.stats.expressiveMonth.description')}</Text>
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
    </>
  );

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
      {isExpanded ? expandedContent() : collapsedContent()}
    </AnimatedCard>
  );
};
