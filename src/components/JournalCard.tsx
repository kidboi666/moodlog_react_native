import {
  AnimatePresence,
  Button,
  Card,
  Image,
  Paragraph,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { Journal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { ChevronRight, Trash2 } from '@tamagui/lucide-icons';
import { ENTER_STYLE, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import { LinearGradient } from 'tamagui/linear-gradient';
import { useState } from 'react';
import { router } from 'expo-router';
import { RenderTime } from './RenderTime';

interface Props {
  journal: Journal;
}

export const JournalCard = ({ journal }: Props) => {
  const [isPress, setIsPress] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

  return (
    <XStack gap="$4" items="center">
      <Card
        group
        flex={1}
        elevation="$2"
        l={isLongPress ? -8 : 0}
        animation="quick"
        enterStyle={ENTER_STYLE}
        pressStyle={PRESS_STYLE}
        onLongPress={() => setIsLongPress(true)}
        animateOnly={PRESS_STYLE_KEY}
        bg="$gray4"
        rounded="$8"
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
              <RenderTime
                createdAt={journal.createdAt}
                fontSize="$7"
                lineHeight={20}
                color="$gray9"
                fontWeight="800"
              />
              <Paragraph color="$gray12" flex={1} numberOfLines={2}>
                {journal.content ?? ''}
              </Paragraph>
            </YStack>
            <ChevronRight size="$1" />
          </XStack>
        </Card.Header>

        {journal.imageUri && (
          <Card.Background rounded="$8">
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
      {isLongPress && <Button animation="quick" icon={Trash2} />}
    </XStack>
  );
};
