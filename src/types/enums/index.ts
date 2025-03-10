export enum EmotionType {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  PEACE = 'peace',
}

export enum EmotionLevel {
  ZERO = 'zero',
  HALF = 'half',
  FULL = 'full',
}

export enum ViewFontSize {
  SMALL = '$6',
  MEDIUM = '$8',
  LARGE = '$9',
}

export enum Languages {
  EN = 'en',
  KO = 'ko',
}

export type Theme = 'dark' | 'light' | 'system';

export type ContextName = 'week' | 'entries' | 'statistic' | 'global';
