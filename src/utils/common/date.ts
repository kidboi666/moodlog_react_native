import { ISODateString } from '@/types/dtos/date';
import { MONTHS, WEEK_DAY } from '@/constants/date';

export const formatDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const date = value.getDate().toString().padStart(2, '0');
  const day = value.getDay();
  return { year, month, date, day };
};

export const transformISODate = (time: number) => {
  return new Date(time).toISOString().split('T')[0];
};

export const getWeekNumberInMonth = (date = new Date()) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDayOfMonth.getDay() + 1) / 7);
};

export const getMonthString = (month: number) => {
  return Object.keys(MONTHS)[month];
};

export const getDayInISODateString = (date: ISODateString) => {
  return Object.keys(WEEK_DAY)[new Date(date).getDay()];
};

export const getDateInISODateString = (date: ISODateString) => {
  return date.split('-')[2];
};

export const getLastDate = (year: number, month) => {
  return new Date(year, Object.keys(MONTHS).indexOf(month) + 1, 0).getDate();
};

export const getFirstDateDay = (year: number, month) => {
  return new Date(year, Object.keys(MONTHS).indexOf(month), 1).getDay();
};

export const getWeekLength = (year: number, month: any) => {
  const lastDate = getLastDate(year, month);
  const firstDateDay = getFirstDateDay(year, month);
  return Math.ceil((lastDate + firstDateDay) / 7);
};
