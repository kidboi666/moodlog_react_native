import { IJournal } from '../entries';

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
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}
