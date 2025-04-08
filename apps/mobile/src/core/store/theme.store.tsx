import { PropsWithChildren, useEffect } from 'react';

import { useColorScheme } from 'react-native';

import { Theme as TamaguiTheme } from 'tamagui';

import { create } from 'zustand';

import { ThemeStoreState } from '@/types/theme.types';

export const useAppTheme = create<ThemeStoreState>((set, get) => ({
  currentTheme: 'system',
  resolvedTheme: 'light',
  systemTheme: 'light',

  changeTheme: theme => {
    set({ currentTheme: theme });

    // 선택한 테마가 'system'이면 시스템 테마 사용, 아니면 선택 테마 적용
    const resolvedTheme = theme === 'system' ? get().systemTheme : theme;

    set({ resolvedTheme });
  },

  updateSystemTheme: newSystemTheme => {
    set({ systemTheme: newSystemTheme });

    // 현재 'system' 테마 사용 중일 때만 실제 테마 업데이트
    if (get().currentTheme === 'system') {
      set({ resolvedTheme: newSystemTheme });
    }
  },
}));

export function ThemeProvider({ children }: PropsWithChildren) {
  const updateSystemTheme = useAppTheme(state => state.updateSystemTheme);
  const resolvedTheme = useAppTheme(state => state.resolvedTheme);
  const systemColorScheme = useColorScheme();

  // 시스템 테마 변경 감지
  useEffect(() => {
    if (systemColorScheme) {
      updateSystemTheme(systemColorScheme);
    }
  }, [systemColorScheme, updateSystemTheme]);

  return <TamaguiTheme name={resolvedTheme}>{children}</TamaguiTheme>;
}
