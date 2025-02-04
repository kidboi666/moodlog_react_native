import { useThemeCtx } from '@/store/context/useThemeCtx';
import { View } from 'tamagui';

export const ContentLine = () => {
  const { theme } = useThemeCtx();
  return (
    <View
      borderBottomWidth={1}
      borderColor={theme === 'dark' ? '$color.grey800' : '$color.grey300'}
    />
  );
};
