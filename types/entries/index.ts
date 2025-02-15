import { EmotionLevel, EmotionType } from '@/types/enums';

export type IEmotion = {
  type: EmotionType;
  level: EmotionLevel;
};

export type IJournal = {
  id: string;
  content: string;
  emotion: IEmotion;
  createdAt: string;
  localDate: string;
};

export type IDraft = {} & Partial<
  Pick<IJournal, 'content' | 'emotion' | 'localDate'>
>;
