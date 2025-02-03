import { MenuButton } from '@/components/navigation/MenuButton';
import { useTheme } from '@/store/context/useTheme';

export const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  return <MenuButton onPress={toggleTheme}>테마 변경 하기</MenuButton>;
};
