import { Nullable } from '@/types/common';
import { EmotionLevel, EmotionType } from '@/types/enums';

export interface IEmotion {
  type: Nullable<EmotionType>;
  level: Nullable<EmotionLevel>;
}

export interface IJournal {
  id: string;
  date: Date;
  title?: string;
  content: string;
  emotion: IEmotion;
  keywords?: string[];
}
