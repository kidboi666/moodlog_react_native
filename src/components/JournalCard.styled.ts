import { Card, Paragraph, styled, View, XStack, YStack } from 'tamagui';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { RenderTime } from '@/components/RenderTime';

export const CardContainer = styled(Card, {
  group: true,
  flex: 1,
  animation: 'quick',
  enterStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
  bg: '$gray4',
  rounded: '$8',
  l: 0,

  variants: {
    isLongPress: {
      true: {
        l: -8,
      },
    },
  } as const,
});

export const CardHeader = styled(Card.Header, {
  padded: true,
});

export const Content = styled(XStack, {
  flex: 1,
  gap: '$4',
  items: 'center',
});

export const MoodBar = styled(View, {
  width: '$0.75',
  my: 'auto',
  height: '75%',
  rounded: '$8',

  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  } as const,
});

export const JournalContentBox = styled(YStack, {
  flex: 1,
  gap: '$2',
});

export const JournalContentText = styled(Paragraph, {
  color: '$gray12',
  flex: 1,
  numberOfLines: 4,
});

export const TimeText = styled(RenderTime, {
  fontSize: '$7',
  lineHeight: 20,
  color: '$gray9',
  fontWeight: '800',
});
