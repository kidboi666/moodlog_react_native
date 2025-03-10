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
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { NewUserInfo } from '@/types/dtos/user';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { EnhancedTextInputRef } from '@/screens/write/EnhancedTextInput';

export interface JournalStore {
  journals: Journal[];
  dailyJournals: Journal[] | ISODateString;
  selectedJournal?: Journal;
  monthlyJournals: Journal[];
  yearlyJournals: Journal[];
  isSubmitted: boolean;
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
  onSubmittedChange: () => void;
  updateJournals: (id: string, updateJournal: Journal) => void;
  getJournalsByDate: (date: ISODateString) => void;
  getJournalsByMonth: (date: ISOMonthString) => void;
  getJournalsByYear: (year: number) => void;
}

export interface ThemeStore {
  changeTheme: (theme: Theme) => void;
  currentTheme: Theme;
  resolvedTheme: Omit<Theme, 'system'>;
}

export interface AppStore {
  appVersion: string;
  language: any;
  isInitialApp: boolean;
  initializeFirstLaunchStatus: () => Promise<Nullable<ISODateString>>;
  firstLaunchDate: Nullable<ISODateString>;
  onChangeLanguage: (language: any) => void;
  onChangeFontSize: (fontSize: ViewFontSize) => void;
  fontSize: ViewFontSize;
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
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  onSelectedYearChange: (year: number) => void;
  onSelectedMonthChange: (month: Nullable<ISOMonthString>) => void;
  onSelectedDateChange: (date: ISODateString) => void;
  initSelectedDates: () => void;
}

export type StatisticsStore = WithState<
  {
    journalStats: JournalStats;
    emotionStats: EmotionStats;
    expressiveMonthStats: ExpressiveMonthStats;
    selectedMonthStats: Nullable<SelectedMonthStats>;
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
  selection: { start: number; end: number };
  onSelectionChange: (
    event: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
  ) => void;
  enhancedInputRef: MutableRefObject<EnhancedTextInputRef | null>;
  onTimeStamp: () => void;
  onLocalDateChange: (date: ISODateString) => void;
  onEmotionChange: (emotion: Emotion) => void;
  onImageUriChange: () => Promise<Nullable<void>>;
  onContentChange: (content: string) => void;
}

export type StorageStore = WithState<
  {
    journals: Journal[];
    setJournals: Dispatch<SetStateAction<Journal[]>>;
  },
  LoadingState
>;
