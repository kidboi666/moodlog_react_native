import { Button } from '@/components/common/Button';
import { useThemeCtx } from '@/store/context/useThemeCtx';

export const ThemeToggle = () => {
  const { toggleTheme } = useThemeCtx();
  return <Button onPress={toggleTheme}>테마 변경 하기</Button>;
};
