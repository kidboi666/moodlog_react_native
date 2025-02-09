import { Button, Square, Text, XStack } from 'tamagui';
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
      bg="$gray3"
      elevation="$1"
      rounded="$4"
      items="center"
      gap="$4"
      p="$4"
      pressStyle={{
        scale: 0.95,
      }}
    >
      <Square
        size="$1.5"
        rounded="$3"
        borderWidth={2}
        borderColor="$gray5"
        bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
      />
      <Text color="$gray11" flex={1} numberOfLines={2}>
        {journal.content}
      </Text>
      <Button onPress={() => onDelete(journal.id)} chromeless icon={Delete} />
    </XStack>
  );
};
