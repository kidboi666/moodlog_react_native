import { Paragraph, View, XStack, YStack, ZStack } from 'tamagui';
import { IJournal } from '@/types/entries';
import { Link } from 'expo-router';
import { CurrentDate } from '@/components/Date';
import { emotionTheme } from '@/constants/themes';

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
        bg="$gray5"
        rounded="$4"
        p="$4"
        pressStyle={{
          scale: 0.98,
        }}
        enterStyle={{
          scale: 0,
        }}
        borderWidth={0}
        items="center"
        gap="$4"
      >
        <YStack flex={1}>
          <Paragraph color="$gray12" flex={1} numberOfLines={2}>
            {journal.content.trim()}
          </Paragraph>
          <CurrentDate localDate={journal.localDate} />
        </YStack>
        <View position="absolute" r="$4" t={0}>
          <ZStack>
            <View
              bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
              width="$1"
              z="$1"
              height="$3"
              position="absolute"
              r={0}
              t={0}
              borderBottomLeftRadius="$4"
            />
          </ZStack>
        </View>
      </XStack>
    </Link>
  );
};
