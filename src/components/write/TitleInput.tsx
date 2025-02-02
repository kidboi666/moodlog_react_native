import { ThemedInputProps } from '@/components/common/ThemedInput.tsx';
import { useTheme } from '@/store/context/useTheme';
import { TextInput } from 'react-native';

interface TitleInputProps extends ThemedInputProps {}

export const TitleInput = ({ ...props }: TitleInputProps) => {
  const { colors } = useTheme();
  return (
    <TextInput
      autoFocus={true}
      placeholder="제목을 입력하세요."
      placeholderTextColor={colors.text.placeholder}
      style={{
        fontSize: 20,
        paddingVertical: 8,
        color: colors.text.secondary,
      }}
      {...props}
    />
  );
};
