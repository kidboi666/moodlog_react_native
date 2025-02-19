import { EmotionLevel, EmotionType } from '@/types/enums';

export type IEmotion = {
  type: EmotionType;
  level: EmotionLevel;
};

export type IJournal = {
  id: string;
  title: string;
  content: string;
  emotion: IEmotion;
  createdAt: string;
  localDate: string; // YYYY-MM-DD
};

export type IDraft = {} & Partial<
  Pick<IJournal, 'title' | 'content' | 'emotion' | 'localDate'>
>;

export type IDateCounts = {
  [date: string]: number;
};

export type IUserInfo = {
  id: string;
  userName: string;
  age?: number;
  email?: string;
  provider?: string;
  avatarUrl?: string;
};
