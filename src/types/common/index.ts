import { WEEK_DAY } from '@/src/constants/date';

export type Nullable<T> = T | null;

export type WeekDayKey = keyof typeof WEEK_DAY;
export type WeekDayValue = (typeof WEEK_DAY)[WeekDayKey];
