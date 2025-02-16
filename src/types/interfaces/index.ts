import { IDraft, IEmotion, IJournal } from '@/types/entries';
import { ViewFontSize } from '@/types/enums';
import { ReactNode } from 'react';

/**
 * Store
 */
export interface IJournalStore {
  journals: IJournal[];
  selectedJournals: IJournal[];
  draft: IDraft;
  addJournal: (journal: IDraft) => void;
  removeJournal: (id: string) => void;
  updateJournals: (id: string, updateJournal: IJournal) => void;
  updateDraftLocalDate: (date: string) => void;
  updateDraftEmotion: (emotion: IEmotion) => void;
  updateDraftContent: (content: string) => void;
  updateSelectedJournals: (date: string) => void;
}

export interface IThemeStore {
  toggleTheme: () => void;
  currentTheme: 'dark' | 'light';
}

export interface IAppStore {
  fontSize: ViewFontSize;
  language: any;
  onChangeFontSize: () => void;
}

// TODO any
export interface IBottomSheetModalStore {
  content: any;
  setContent: (content: any) => void;
  ref: any;
  onOpenModal: (params: ReactNode) => void;
}
