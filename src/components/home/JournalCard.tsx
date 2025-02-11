import { Button, Square, Text, XStack, YStack } from 'tamagui';
import { Delete } from '@tamagui/lucide-icons';
import { IJournal } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { useState } from 'react';

interface Props {
  journal: IJournal;
  onDelete: (journalId: string) => void;
}

export const JournalCard = ({ journal, onDelete }: Props) => {
  const [isRotate, setIsRotate] = useState<boolean>(false);
  return (
    <XStack
      animation="medium"
      rounded="$4"
      borderWidth={0}
      items="center"
      gap="$4"
      pb="$4"
      onPressIn={() => setIsRotate(true)}
      onPressOut={() => setIsRotate(false)}
      pressStyle={{
        scale: 0.98,
      }}
    >
      <YStack px="$4" rotate={isRotate ? '0deg' : '10deg'} animation="medium">
        <Square
          size="$1"
          rounded="$3"
          bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
        />
      </YStack>
      <Text color="$gray11" flex={1} numberOfLines={2}>
        {journal.content}
      </Text>
      <Button onPress={() => onDelete(journal.id)} chromeless icon={Delete} />
    </XStack>
  );
};
