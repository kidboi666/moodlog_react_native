import {
  IDateCounts,
  IDraft,
  IEmotion,
  IJournal,
  IUserInfo,
} from '@/types/entries';
import { ViewFontSize } from '@/types/enums';
import { ISODateString } from '@/types/dtos/date';
import { RefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Nullable } from '@/types/common';
import { UserInfo } from '@/types/dtos/user';

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

export interface IBottomModalStore {
  modalRef: RefObject<BottomSheetModal>;
  openModal: () => void;
}

export interface IUserStore {
  userInfo: Nullable<IUserInfo>;
  isInitialUser: boolean;
  signUp: (params: UserInfo) => void;
}
