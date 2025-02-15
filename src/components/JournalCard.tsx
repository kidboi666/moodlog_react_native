import { Paragraph, XStack, YStack } from 'tamagui';
import { IJournal } from '@/types/entries';
import { Link } from 'expo-router';
import { CurrentDateWithoutYear } from '@/components/CurrentDateWithoutYear';
import { useEffect, useState } from 'react';

interface Props {
  journal: IJournal;
  index: number;
}

export const JournalCard = ({ journal, index }: Props) => {
  const [show, setShow] = useState(false);
  const [firstLine, ...restLines] = journal.content.split('\n');
  useEffect(() => {
    const time = setTimeout(() => {
      setShow(true);
    }, index * 50);
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
        items="center"
        gap="$4"
        animation="quick"
        enterStyle={{
          scale: 0.85,
          opacity: 0,
        }}
        pressStyle={{
          scale: 0.98,
          opacity: 0.5,
        }}
      >
        <YStack flex={1} gap="$4">
          <Paragraph fontWeight="800" fontSize="$6">
            {firstLine.trim()}
          </Paragraph>
          {restLines.length > 0 && (
            <Paragraph color="$gray12" flex={1} numberOfLines={4}>
              {restLines}
            </Paragraph>
          )}
          <CurrentDateWithoutYear localDate={journal.localDate} fontSize="$2" />
        </YStack>
      </XStack>
    </Link>
  );
};
