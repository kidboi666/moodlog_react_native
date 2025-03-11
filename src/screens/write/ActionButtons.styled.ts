import { Button, Separator, styled, XGroup } from 'tamagui';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';

export const XGroupContainer = styled(XGroup, {
  position: 'absolute',
  r: 0,
  b: 12,
  p: '$2',
  gap: '$2',
  size: '$5',
  borderColor: '$gray6',
  borderWidth: 1,
});

export const VerticalSeparator = styled(Separator, {
  borderColor: '$gray6',
  vertical: true,
});

const ButtonBase = styled(Button, {
  unstyled: true,
  color: '$gray11',
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
