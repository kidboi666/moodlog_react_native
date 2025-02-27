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
    selectedJournal?: Journal;
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
    onChangeSelectedJournal: (journalId: string) => void;
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
  isInitialApp: boolean;
  initializeFirstLaunchStatus: () => Promise<ISODateString>;
  firstLaunchDate: Nullable<ISODateString>;
  onChangeFontSize: () => void;
  onChangeLanguage: (language: any) => void;
}

export type UserStore = WithState<
  {
    userInfo: UserInfo;
    draftUserName: string;
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
  currentYear: number;
  currentMonth: number;
  onSelectedYearChange: (year: number) => void;
  onSelectedMonthChange: (month: number) => void;
}

export type StatisticsStore = WithState<
  {
    journalStats: JournalStats;
    emotionStats: EmotionStats;
  },
  LoadingState
>;

export interface ScrollStore {
  scrollPosition: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetScroll: () => void;
}
