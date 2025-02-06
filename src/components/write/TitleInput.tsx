import { Input, styled } from 'tamagui';

const StyledTitleInput = styled(Input, {
  bg: 'transparent',
  fontFamily: '$body',
  fontSize: '$6',
  borderWidth: 0,
  color: '$textSecondary',
  px: 0,
  py: 8,
});

export const TitleInput = ({ ...props }) => {
  return (
    <StyledTitleInput
      autoFocus={true}
      style={{ fontFamily: 'goorm-sans-regular' }}
      placeholder="제목을 입력하세요."
      placeholderTextColor="$textPlaceholder"
      {...props}
    />
  );
};
