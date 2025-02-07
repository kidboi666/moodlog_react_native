import { Button, styled } from 'tamagui';

export const WriteTabButton = styled(Button, {
  unstyled: true,
  rounded: '$8',
  flex: 1,
  items: 'center',
  justify: 'center',
  p: '$5',
  bg: '$color.beige900',
  animation: 'quick',
  shadowColor: '$color.beige900',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,

  pressStyle: {
    scale: 0.85,
    opacity: 0.9,
  },
  hoverStyle: {
    scale: 1.1,
  },
  enterStyle: {
    scale: 0.9,
    opacity: 0,
    y: 10,
  },
  exitStyle: {
    scale: 0.9,
    opacity: 0,
    y: 10,
  },
});

export const AnimatedTabButton = styled(Button, {
  unstyled: true,
  animation: 'quick',
  flex: 1,
  p: '$3',

  pressStyle: {
    scale: 0.85,
  },
  enterStyle: {
    scale: 0.9,
    opacity: 0,
    y: 10,
  },
});
