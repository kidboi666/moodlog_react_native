import { EmotionLevel, EmotionType } from 'src/types/enums';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { Nullable } from '@/types/utils';

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
  daysSinceSignup: number;
  age: Nullable<number>;
  email: Nullable<string>;
  provider: Nullable<string>;
  avatarUrl: Nullable<string>;
};

export type MonthlyCounts = {
  [key in ISOMonthString]: number;
};

export type ExpressiveMonth = {
  month: ISOMonthString | string;
  count: number;
};

export type JournalStats = {
  totalCount: number;
  monthlyFrequency: number;
  monthlyActiveDay: string;
  totalFrequency: number;
  totalActiveDay: string;
  monthlyCounts: MonthlyCounts;
  expressiveMonth: ExpressiveMonth;
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
