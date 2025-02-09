import { IEmotion, IJournal } from '../entries';

/**
 * Store
 */
export interface IDiaryStore {
  journals: IJournal[];
  draftJournal: IJournal;
  addJournal: (journal: IJournal) => void;
  removeJournal: (id: string) => void;
  updateJournals: (id: string, updateJournal: IJournal) => void;
  updateDraftEmotion: (emotion: IEmotion) => void;
  updateDraftContent: (content: string) => void;
}

export interface IThemeStore {
  toggleTheme: () => void;
  theme: 'dark' | 'light';
}
