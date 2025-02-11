import { Button, SizableText, Square, Text, XStack, YStack } from 'tamagui';
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
      p="$4"
      onPressIn={() => setIsRotate(true)}
      onPressOut={() => setIsRotate(false)}
      pressStyle={{
        scale: 0.98,
      }}
    >
      <YStack>
        <Square
          size="$1"
          animation="medium"
          rounded="$3"
          rotate={isRotate ? '15deg' : '0deg'}
          bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
        />
        <SizableText size="$1">{journal.emotion.type}</SizableText>
      </YStack>
      <Text color="$gray11" flex={1} numberOfLines={2}>
        {journal.content}
      </Text>
      <Button onPress={() => onDelete(journal.id)} chromeless icon={Delete} />
    </XStack>
  );
};
