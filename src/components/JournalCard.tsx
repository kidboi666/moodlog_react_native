import { Button, Paragraph, View, XStack, YStack } from 'tamagui';
import { IJournal } from '@/types/entries';
import { Link } from 'expo-router';
import { CurrentDateWithoutYear } from './CurrentDateWithoutYear';
import { useEffect, useState } from 'react';
import { EnterStyle, PressStyle } from '@/constants/styles';
import { emotionTheme } from '@/constants/themes';
import { ChevronRight } from '@tamagui/lucide-icons';

interface Props {
  journal: IJournal;
  index: number;
}

export const JournalCard = ({ journal, index }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setShow(true);
    }, index * 100);
    return () => clearTimeout(time);
  }, []);

  if (!show) return null;

  return (
    <Link
      asChild
      href={{
        pathname: '/(modal)/[journalId]',
        params: { journalId: journal.id },
      }}
    >
      <XStack
        bg="$gray5"
        rounded="$8"
        p="$4"
        pl="$3"
        items="center"
        gap="$3"
        animation="quick"
        enterStyle={EnterStyle}
        pressStyle={PressStyle}
      >
        <View
          width="$0.5"
          height="100%"
          rounded="$8"
          bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
        />
        <YStack flex={1} gap="$4">
          {journal.title && (
            <Paragraph fontWeight="800" fontSize="$6">
              {journal.title.trim()}
            </Paragraph>
          )}
          {journal.content.length > 0 && (
            <Paragraph color="$gray12" flex={1} numberOfLines={4}>
              {journal.content}
            </Paragraph>
          )}
          <CurrentDateWithoutYear localDate={journal.localDate} fontSize="$2" />
        </YStack>
        <Button unstyled icon={<ChevronRight size="$1" />} />
      </XStack>
    </Link>
  );
};
