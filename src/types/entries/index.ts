import { EmotionLevel, EmotionType } from 'src/types/enums';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';

export type Emotion = {
  type: EmotionType;
  level: EmotionLevel;
};

export type Journal = {
  id: string;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
  localDate: ISODateString; // YYYY-MM-DD
};

export type Draft = {} & Partial<
  Pick<Journal, 'title' | 'content' | 'emotion' | 'localDate'>
>;

export type DateCounts = {
  [date: string]: number;
};

export type UserInfo = {
  id: string;
  userName: string;
  age?: number;
  email?: string;
  provider?: string;
  avatarUrl?: string;
};

export type MonthlyCounts = {
  [key in ISOMonthString]: number;
};

export type MonthlyCountsData = {
  month: ISOMonthString | string;
  count: number;
};

export type JournalStats = {
  totalCount: number;
  frequency: number;
  activeDay: string;
  monthlyCounts: MonthlyCounts;
  expressiveMonth: MonthlyCountsData;
};

export type CountScore = {
  count: number;
  score: number;
};

export type ScoreBoard = {
  [key in EmotionType]: CountScore;
};

export type SignatureEmotion = {
  type: EmotionType | string;
  count: number;
  score: number;
};

export type EmotionStats = {
  signatureEmotion: SignatureEmotion;
  scoreBoard: ScoreBoard;
};
