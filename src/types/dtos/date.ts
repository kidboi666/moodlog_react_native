import { WeekDayValue } from '@/types/common';

export type SelectedDate = {
  date: number;
  day: WeekDayValue;
};

export type ISODateString = `${number}-${number}-${number}`;
