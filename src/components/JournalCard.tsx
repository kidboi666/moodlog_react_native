import { Button, Paragraph, View, XStack, YStack } from 'tamagui';
import { Journal } from '@/types/entries';
import { Link } from 'expo-router';
import { CurrentDateWithoutYear } from './CurrentDateWithoutYear';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import { emotionTheme } from '@/constants/themes';
import { ChevronRight } from '@tamagui/lucide-icons';
import { FadeIn } from '@/components/FadeIn';

interface Props {
  journal: Journal;
  index: number;
}

export const JournalCard = ({ journal, index }: Props) => {
  return (
    <FadeIn delay={100 * (index + 1)}>
      <Link
        asChild
        href={{
          pathname: '/journal/[journalId]',
          params: { journalId: journal.id },
        }}
      >
        <XStack
          animation="quick"
          animateOnly={ENTER_STYLE_KEY}
          enterStyle={ENTER_STYLE}
          pressStyle={PRESS_STYLE}
        >
          <XStack
            flex={1}
            bg="$gray5"
            rounded="$8"
            p="$4"
            pl="$3"
            items="center"
            gap="$3"
          >
            <View
              width="$0.75"
              my="auto"
              height="75%"
              rounded="$8"
              bg={emotionTheme[journal.emotion.type][journal.emotion.level]}
            />
            <YStack flex={1} gap="$4">
              {journal.title && (
                <Paragraph fontWeight="800" fontSize="$6">
                  {journal.title.trim()}
                </Paragraph>
              )}
              {journal.content.length > 0 && (
                <Paragraph color="$gray12" flex={1} numberOfLines={4}>
                  {journal.content}
                </Paragraph>
              )}
              <CurrentDateWithoutYear
                localDate={journal.localDate}
                fontSize="$2"
              />
            </YStack>
            <Button unstyled icon={<ChevronRight size="$1" />} />
          </XStack>
        </XStack>
      </Link>
    </FadeIn>
  );
};
