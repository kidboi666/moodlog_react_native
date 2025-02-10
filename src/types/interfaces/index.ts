import { IDraft, IEmotion, IJournal } from '../entries';

/**
 * Store
 */
export interface IJournalStore {
  journals: IJournal[];
  draft: IDraft;
  addJournal: (journal: IDraft) => void;
  removeJournal: (id: string) => void;
  updateJournals: (id: string, updateJournal: IJournal) => void;
  updateDraftLocalDate: (date: string) => void;
  updateDraftEmotion: (emotion: IEmotion) => void;
  updateDraftContent: (content: string) => void;
}

export interface IThemeStore {
  toggleTheme: () => void;
  currentTheme: 'dark' | 'light';
}
