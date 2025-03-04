import {
  AnimatePresence,
  Card,
  Image,
  Paragraph,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { Journal } from '@/types/entries';
import { CurrentDateWithoutYear } from './CurrentDateWithoutYear';
import { emotionTheme } from '@/constants/themes';
import { ChevronRight } from '@tamagui/lucide-icons';
import { ENTER_STYLE } from '@/constants/styles';
import { LinearGradient } from 'tamagui/linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';

interface Props {
  journal: Journal;
}

export const JournalCard = ({ journal }: Props) => {
  const [isPress, setIsPress] = useState(false);
  return (
    <Card
      group
      animation="quick"
      enterStyle={ENTER_STYLE}
      bg="$gray5"
      rounded="$8"
      overflow="hidden"
      onPress={() => {
        setIsPress(true);
        setTimeout(() => {
          router.push({
            pathname: '/(tabs)/journal/[journalId]',
            params: { journalId: journal.id },
          });
        }, 300);
      }}
    >
      <Card.Header padded>
        <XStack flex={1} gap="$4" items="center">
          <View
            width="$0.75"
            my="auto"
            height="75%"
            rounded="$8"
            bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
          />
          <YStack flex={1} gap="$2">
            <Paragraph color="$gray12" flex={1} numberOfLines={2}>
              {journal.content ?? ''}
            </Paragraph>
            <CurrentDateWithoutYear
              localDate={journal.localDate}
              fontSize="$2"
            />
          </YStack>
          <ChevronRight size="$1" />
        </XStack>
      </Card.Header>

      {journal.imageUri && (
        <Card.Background>
          <Image
            animation="medium"
            opacity={0.6}
            objectFit="cover"
            source={{ uri: journal.imageUri }}
            width="100%"
            height="100%"
          />
          <AnimatePresence>
            {!isPress && (
              <LinearGradient
                animation="quick"
                exitStyle={{
                  opacity: 0,
                }}
                width="100%"
                height="100%"
                colors={['$gray5', 'rgba(0,0,0,0)']}
                start={[0, 0]}
                end={[2.4, 0]}
                // 이미지 위에 그라디언트 위치하도록
                position="absolute"
                pointerEvents="none"
              />
            )}
          </AnimatePresence>
        </Card.Background>
      )}
    </Card>
  );
};
