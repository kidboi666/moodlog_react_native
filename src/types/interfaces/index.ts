import { TColors } from '@/types/common';
import { IJournal } from '@/types/entries';

/**
 * Store
 */
export interface IDiaryStore {
  journals: IJournal[];
  addJournal: (journal: IJournal) => void;
  removeJournal: (id: string) => void;
  updateJournal: (id: string, updateJournal: IJournal) => void;
}

export interface IThemeStore {
  colors: TColors;
  toggleTheme: (selectedTheme: boolean) => void;
  isDark: boolean;
  barStyle: 'light-content' | 'dark-content';
}
