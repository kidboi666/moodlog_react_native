import { Button } from '@/components/common/Button';
import { useTheme } from '@/store/context/useTheme';

interface Props {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  return <Button onPress={toggleTheme}>테마 변경 하기</Button>;
};
