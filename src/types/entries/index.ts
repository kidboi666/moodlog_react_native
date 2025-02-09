import { Nullable } from '../common';
import { EmotionLevel, EmotionType } from '../enums';

export interface IEmotion {
  type: Nullable<EmotionType>;
  level: Nullable<EmotionLevel>;
}

export interface IJournal {
  id: string;
  createdAt: string;
  title?: string;
  content: string;
  emotion: IEmotion;
  keywords?: string[];
}
