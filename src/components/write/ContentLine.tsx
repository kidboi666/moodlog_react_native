import { useTheme } from '@/store/context/useTheme';
import { View } from 'tamagui';

export const ContentLine = () => {
  const { theme } = useTheme();
  return (
    <View
      borderWidth={1}
      borderColor={theme === 'dark' ? '$color.grey800' : '$color.grey300'}
    />
  );
};
