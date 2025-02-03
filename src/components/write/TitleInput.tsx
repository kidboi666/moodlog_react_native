import { Input, InputProps } from 'tamagui';

export const TitleInput = ({ ...props }: InputProps) => {
  return (
    <Input
      autoFocus={true}
      borderWidth={0}
      placeholder="제목을 입력하세요."
      placeholderTextColor="$textPlaceholder"
      fontSize={20}
      py={8}
      px={0}
      color="$textSecondary"
      {...props}
    />
  );
};
