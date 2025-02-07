import { Button, Card, Circle, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { ChevronRight } from '@tamagui/lucide-icons';

interface Props {
  title: string;
  content: string;
  emotion: string;
}

export const JournalCard = ({ title, content, emotion }: Props) => {
  return (
    <Card
      unstyled
      animation="medium"
      bg="$beige200"
      size="$4"
      pressStyle={{
        scale: 0.95,
      }}
    >
      <Card.Header padded>
        <XStack items="center" justify="space-between" gap={12}>
          <Circle size="$2" bg={emotion as any} />
          <YStack flex={1}>
            <Text>{title}</Text>
            <Text>{content}</Text>
          </YStack>
          <XStack>
            <Button chromeless icon={<ChevronRight />} />
          </XStack>
        </XStack>
      </Card.Header>
    </Card>
  );
};
