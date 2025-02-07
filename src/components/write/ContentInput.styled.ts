import { Button, Input, styled, View, YStack } from 'tamagui';

export const Container = styled(YStack, {
  flex: 1,
});

export const ContentInput = styled(Input, {
  fontFamily: '$body',
  fontSize: '$6',
  placeholderTextColor: '$placeholder',
  color: '$text',
});

export const ViewBox = styled(View, {
  flex: 1,
  height: '100%',
});

export const InputFocusTrigger = styled(Button, {
  flex: 1,
  height: '100%',
});
