import { Button, styled, View, XStack, YStack } from 'tamagui';
import { Container as HOSContainer } from '@/components/layouts/containers/Container';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';

export const ViewContainer = styled(HOSContainer, {
  gap: '$3',
  pl: 0,
});

export const XStackContainer = styled(XStack, {
  flex: 1,
  gap: '$3',
});

const MoodBarBase = styled(View, {
  width: '3%',
  height: '100%',
  borderTopRightRadius: '$4',
  borderBottomRightRadius: '$4',
});

export const ColoredMoodBar = styled(MoodBarBase, {
  variants: {
    moodColor: {
      ':string': bg => {
        return { bg };
      },
    },
  },
});

export const UncoloredMoodBar = styled(MoodBarBase, {
  bg: '$gray8',
});

export const TextContentBox = styled(YStack, {
  gap: '$6',
  flex: 1,
  z: 1,
});

export const ButtonsViewBox = styled(View, {
  items: 'center',
});

export const ButtonsXStackBox = styled(XStack, {
  position: 'absolute',
  r: 0,
  b: 12,
  gap: '$2',
});

const ButtonBase = styled(Button, {
  unstyled: true,
  p: '$3',
  animation: 'medium',
  enterStyle: ENTER_STYLE,
  exitStyle: ENTER_STYLE,
  pressStyle: PRESS_STYLE,
  scaleIcon: 1.5,
});

export const AddImageButton = styled(ButtonBase);
export const TimeStampButton = styled(ButtonBase);
export const SubmitButton = styled(ButtonBase);
