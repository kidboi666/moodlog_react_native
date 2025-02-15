import { Paragraph, XStack, YStack } from 'tamagui';
import { IJournal } from '@/types/entries';
import { Link } from 'expo-router';
import { CurrentDateWithoutYear } from '@/components/CurrentDateWithoutYear';

interface Props {
  journal: IJournal;
  onDelete: (journalId: string) => void;
}

export const JournalCard = ({ journal, onDelete }: Props) => {
  return (
    <Link
      asChild
      href={{
        pathname: '/(modal)/[journalId]',
        params: { journalId: journal.id },
      }}
    >
      <XStack
        animation="medium"
        bg="$gray7"
        rounded="$8"
        p="$4"
        pressStyle={{
          scale: 0.98,
        }}
        enterStyle={{
          scale: 0,
        }}
        items="center"
        gap="$4"
      >
        <YStack flex={1}>
          <Paragraph color="$gray12" flex={1} numberOfLines={2}>
            {journal.content.trim()}
          </Paragraph>
          <CurrentDateWithoutYear localDate={journal.localDate} />
        </YStack>
      </XStack>
    </Link>
  );
};
