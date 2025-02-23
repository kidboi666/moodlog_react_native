import {
  DateCounts,
  Draft,
  Emotion,
  EmotionStats,
  Journal,
  JournalStats,
  UserInfo,
} from '@/types/entries';
import { Theme, ViewFontSize } from 'src/types/enums';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { LoadingState, Nullable, WithState } from 'src/types/utils';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type JournalStore = WithState<
  {
    journals: Journal[];
    selectedJournals: Journal[];
    monthlyJournals: Journal[];
    yearlyJournals: Journal[];
    draft: Draft;
    addJournal: (journal: Draft) => void;
    removeJournal: (id: string) => void;
    getDateCountsForMonth: (year: number, month: number | string) => DateCounts;
    getDateCountsForDate: (
      year: number,
      month: number | string,
      date: number,
    ) => number;
    updateJournals: (id: string, updateJournal: Journal) => void;
    updateDraftLocalDate: (date: ISODateString) => void;
    updateDraftEmotion: (emotion: Emotion) => void;
    updateDraftContent: (content: string) => void;
    updateDraftTitle: (title: string) => void;
    getJournalsByDate: (date: ISODateString) => void;
    getJournalsByMonth: (date: ISOMonthString) => void;
    getJournalsByYear: (year: number) => void;
  },
  LoadingState
>;

export interface ThemeStore {
  changeTheme: (theme: Theme) => void;
  currentTheme: Theme;
  resolvedTheme: Omit<Theme, 'system'>;
}

export interface AppStore {
  fontSize: ViewFontSize;
  language: any;
  onChangeFontSize: () => void;
  onChangeLanguage: (language: any) => void;
}

export type UserStore = WithState<
  {
    userInfo: Nullable<UserInfo>;
    draftUserName: string;
    isInitialUser: boolean;
    signUp: (userName: string) => void;
    onChangeDraftUserName: (userName: string) => void;
  },
  LoadingState
>;

export interface StepProgressStore {
  totalSteps: number;
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isLastStep: boolean;
  progress: number;
}

export interface DateStore {
  selectedYear: number;
  selectedMonth: number;
  onChangeSelectedYear: (year: number) => void;
  onChangeSelectedMonth: (month: number) => void;
}

export type StatisticsStore = WithState<
  {
    journalStats: JournalStats;
    emotionStats: Nullable<EmotionStats>;
  },
  LoadingState
>;

export interface ScrollStore {
  scrollPosition: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetScroll: () => void;
}
