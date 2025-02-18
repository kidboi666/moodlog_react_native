import { WeekDayValue } from 'src/types/utils';

export type SelectedDate = {
  date: number;
  day: WeekDayValue;
};

export type ISODateString = `${number}-${number}-${number}`;
