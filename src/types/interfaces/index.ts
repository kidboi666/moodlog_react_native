import { IDateCounts, IDraft, IEmotion, IJournal } from '@/types/entries';
import { ViewFontSize } from '@/types/enums';
import { ISODateString } from '@/types/dtos/date';

/**
 * Store
 */
export interface IJournalStore {
  journals: IJournal[];
  selectedJournals: IJournal[];
  draft: IDraft;
  addJournal: (journal: IDraft) => void;
  removeJournal: (id: string) => void;
  getDateCountsForMonth: (year: number, month: number) => IDateCounts;
  updateJournals: (id: string, updateJournal: IJournal) => void;
  updateDraftLocalDate: (date: string) => void;
  updateDraftEmotion: (emotion: IEmotion) => void;
  updateDraftContent: (content: string) => void;
  updateDraftTitle: (title: string) => void;
  updateSelectedJournals: (date: ISODateString) => void;
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
export interface IBottomModalStore {
  modalRef: any;
  openModal: () => void;
}
