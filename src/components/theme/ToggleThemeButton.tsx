import { ThemedButton } from '@/components/common/ThemedButton';
import { useTheme } from '@/store/context/useTheme';

export const ToggleThemeButton = () => {
  const { toggleTheme } = useTheme();
  return (
    <ThemedButton onPress={() => toggleTheme()}>다크모드 변경</ThemedButton>
  );
};
