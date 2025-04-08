import { Button, Separator as TamaguiSeparator, XGroup, styled } from 'tamagui';

export const XGroupContainer = styled(XGroup);

export const Separator = styled(TamaguiSeparator, {
  vertical: true,
});

export const BaseButton = styled(Button, {
  scaleIcon: 1.5,
});

export const ActionButton = styled(BaseButton);

export const SubmitButton = styled(BaseButton, {
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});
