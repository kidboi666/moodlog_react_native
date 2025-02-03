import { ThemedInputProps } from '@/components/common/ThemedInput.tsx';
import { Input } from 'tamagui';

interface TitleInputProps extends ThemedInputProps {}

export const TitleInput = ({ ...props }: TitleInputProps) => {
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
