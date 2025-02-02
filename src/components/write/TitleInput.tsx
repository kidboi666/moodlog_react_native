import { ThemedInputProps } from '@/components/common/ThemedInput.tsx';
import { useTheme } from '@/store/context/useTheme';
import { TextInput } from 'react-native';

interface TitleInputProps extends ThemedInputProps {}

export const TitleInput = ({ ...props }: TitleInputProps) => {
  const { colors } = useTheme();
  return (
    <TextInput
      style={{
        height: 40,
        color: colors.text.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.text.disabled,
      }}
      {...props}
    />
  );
};
