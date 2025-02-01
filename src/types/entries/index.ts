import { Nullable } from '@/types/common';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { StatusBarStyle } from 'react-native';

export interface IEmotion {
  type: Nullable<EmotionType>;
  level: Nullable<EmotionLevel>;
}

export interface IJournal {
  id: string;
  date: Date;
  content: string;
  emotion: IEmotion;
  keywords?: string[];
}

export interface ITheme {
  isDarkMode: boolean;
  colors: {
    background: {
      backgroundColor: string;
    };
    text: {
      color: string;
    };
  };
  barStyle: StatusBarStyle;
}
