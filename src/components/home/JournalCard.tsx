import { Button, Card, Circle, Text, XStack, YStack } from 'tamagui';
import { ChevronRight, Delete } from '@tamagui/lucide-icons';
import { IJournal } from '@/types/entries';

interface Props {
  journal: IJournal;
  onDelete: (journalId: string) => void;
}

export const JournalCard = ({ journal, onDelete }: Props) => {
  return (
    <Card
      unstyled
      animation="medium"
      bg="$gray3"
      size="$4"
      pressStyle={{
        scale: 0.95,
      }}
    >
      <Card.Header padded>
        <XStack items="center" justify="space-between" gap={12}>
          <Circle size="$2" bg={journal.emotion as any} />
          <YStack flex={1}>
            <Text>{journal.title}</Text>
            <Text>{journal.content}</Text>
          </YStack>
          <XStack>
            <Button chromeless icon={<ChevronRight />} />
            <Button
              onPress={() => onDelete(journal.id)}
              chromeless
              icon={<Delete />}
            />
          </XStack>
        </XStack>
      </Card.Header>
    </Card>
  );
};
