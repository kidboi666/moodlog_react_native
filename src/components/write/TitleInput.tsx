import { Input } from 'tamagui';

export const TitleInput = ({ ...props }) => {
  return (
    <Input
      unstyled
      fontSize="$6"
      borderWidth={0}
      px={0}
      py="$4"
      autoFocus={true}
      placeholderTextColor="$placeholder"
      placeholder="제목을 입력하세요."
      {...props}
    />
  );
};
