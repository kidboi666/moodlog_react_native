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
import { LoadingState, Nullable, WithState } from 'src/types/utils';

export type IJournalStore = WithState<
  {
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
  },
  LoadingState
>;

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
  closeModal: () => void;
}

export type IUserStore = WithState<
  {
    userInfo: Nullable<IUserInfo>;
    draftUserName: string;
    isInitialUser: boolean;
    signUp: (userName: string) => void;
    onChangeDraftUserName: (userName: string) => void;
  },
  LoadingState
>;

export interface IStepProgressStore {
  totalSteps: number;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isLastStep: boolean;
  progress: number;
}
