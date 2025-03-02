import {
  DateCounts,
  Draft,
  Emotion,
  EmotionStats,
  ExpressiveMonthStats,
  Journal,
  JournalStats,
  SelectedMonthStats,
  UserInfo,
} from '@/types/entries';
import { Theme, ViewFontSize } from 'src/types/enums';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { LoadingState, MonthKey, Nullable, WithState } from 'src/types/utils';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { NewUserInfo } from '@/types/dtos/user';
import { APP_VERSION } from '@/constants/common';

export type JournalStore = WithState<
  {
    journals: Journal[];
    dailyJournals: Journal[];
    selectedJournal?: Journal;
    monthlyJournals: Journal[];
    yearlyJournals: Journal[];
    addJournal: (journal: Draft) => void;
    removeJournal: (id: string) => void;
    getDateCountsForMonth: (year: number, month: number | string) => DateCounts;
    getDateCountsForDate: (
      year: number,
      month: number | string,
      date: number,
    ) => number;
    getEmotionForDate: (year: number, month: number, date: number) => Emotion[];
    onSelectedJournalChange: (journalId: string) => void;
    updateJournals: (id: string, updateJournal: Journal) => void;
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
  appVersion: typeof APP_VERSION;
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
    onUserInfoChange: (newUserInfo: NewUserInfo) => void;
    onDraftUserNameChange: (userName: string) => void;
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
  selectedMonth: ISOMonthString;
  selectedDate: ISODateString;
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  onSelectedYearChange: (year: number) => void;
  onSelectedMonthChange: (month: ISOMonthString) => void;
  onSelectedDateChange: (date: ISODateString) => void;
}

export type StatisticsStore = WithState<
  {
    journalStats: JournalStats;
    emotionStats: EmotionStats;
    expressiveMonthStats: ExpressiveMonthStats;
    selectedMonthStats: SelectedMonthStats;
  },
  LoadingState
>;

export interface ScrollStore {
  scrollPosition: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetScroll: () => void;
}

export type GardenStore = WithState<
  {
    months: {
      monthKey: MonthKey;
      lastDate: number;
      firstDateDay: number;
      weekLength: number;
    }[];
    onMonthChange: (ISOMonth: MonthKey) => void;
  },
  LoadingState
>;

export interface DraftStore {
  draft: Draft;
  initDraft: () => void;
  onLocalDateChange: (date: ISODateString) => void;
  onEmotionChange: (emotion: Emotion) => void;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onDraftSubmit: (draft: Draft) => void;
}
