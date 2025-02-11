import { Button, Square, Text, XStack, YStack } from 'tamagui';
import { Delete } from '@tamagui/lucide-icons';
import { IJournal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';

interface Props {
  journal: IJournal;
  onDelete: (journalId: string) => void;
}

export const JournalCard = ({ journal, onDelete }: Props) => {
  return (
    <XStack
      animation="medium"
      rounded="$4"
      borderWidth={0}
      items="center"
      gap="$4"
      p="$4"
      pressStyle={{
        scale: 0.95,
      }}
    >
      <YStack>
        <Square
          size="$1"
          rotate="10deg"
          rounded="$3"
          bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
        />
        <Text>{journal.emotion.type}</Text>
      </YStack>
      <Text color="$gray11" flex={1} numberOfLines={2}>
        {journal.content}
      </Text>
      <Button onPress={() => onDelete(journal.id)} chromeless icon={Delete} />
    </XStack>
  );
};
