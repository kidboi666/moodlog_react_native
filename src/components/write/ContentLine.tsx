import { styled, View } from 'tamagui';

const StyledView = styled(View, {
  borderBottomWidth: 1,
  borderColor: '$line',
});

export const ContentLine = () => {
  return <StyledView />;
};
