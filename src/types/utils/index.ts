import { WEEK_DAY } from '@/constants/date';

/**
 * type
 */
export type Nullable<T> = T | null;

export type WithState<T, S> = T & S;

export type WeekDayKey = keyof typeof WEEK_DAY;
export type WeekDayValue = (typeof WEEK_DAY)[WeekDayKey];

/**
 * interface
 */
export interface LoadingState {
  isLoading: boolean;
}

export interface ErrorState {
  error: Error | null;
}
