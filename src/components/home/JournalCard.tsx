import { Button, Card, View, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { FileEdit, X } from '@tamagui/lucide-icons';

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
      size="$4"
      pressStyle={{
        scale: 0.95,
        backgroundColor: '$color.beige800',
      }}
    >
      <Card.Header padded>
        <XStack items="center" gap={8}>
          <View width="$2" height="$2" bg={emotion as any} rounded="$4" />
          <YStack flex={1}>
            <Text fontFamily="$body" color="$textPrimary" fontSize="$4">
              {title}
            </Text>
            <Text>{content}</Text>
          </YStack>
          <XStack>
            <Button icon={<FileEdit />}></Button>
            <Button icon={<X />}></Button>
          </XStack>
        </XStack>
      </Card.Header>
    </Card>
  );
};
