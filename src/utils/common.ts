import { MONTHS, WEEK_DAY } from '@/constants/date';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { emotionTheme } from '@/constants/themes';
import { MonthKey } from '@/types/utils';

export const formatDate = (value: Date) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const date = value.getDate().toString().padStart(2, '0');
  const day = value.getDay();
  return { year, month, date, day };
};

export const removeLeadingZero = (str: string) => {
  str = String(str);

  if (str.charAt(0) === '0' && str.length > 1) {
    return str.substring(1);
  }

  return str;
};

export const getMonthNumber = (month: string) => {
  return Object.keys(MONTHS).indexOf(month + 1);
};

export const getMonthString = (month: number) => {
  return Object.keys(MONTHS)[month];
};

export const getDayInISODateString = (date: ISODateString) => {
  return Object.keys(WEEK_DAY)[new Date(date).getDay()];
};

export const getISODateString = (year: number, month: number, date: number) => {
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}` as ISODateString;
};

export const getDateInISODateString = (date: ISODateString) => {
  return removeLeadingZero(date.split('-')[2]);
};

export const getMonthInISODateString = (
  year: number,
  month: number | MonthKey,
) => {
  if (typeof month === 'number') {
    return `${year}-${(month + 1).toString().padStart(2, '0')}` as ISOMonthString;
  }
  return `${year}-${(Object.keys(MONTHS).indexOf(month) + 1)
    .toString()
    .padStart(2, '0')}` as ISOMonthString;
};

export const getLastDate = (year: number, month: number | MonthKey) => {
  if (typeof month === 'number') {
    return new Date(year, month + 1, 0).getDate();
  }
  return new Date(year, Object.keys(MONTHS).indexOf(month) + 1, 0).getDate();
};

export const getFirstDateDay = (year: number, month: string) => {
  return new Date(year, Object.keys(MONTHS).indexOf(month), 1).getDay();
};

export const getWeekLength = (year: number, month: any) => {
  const lastDate = getLastDate(year, month);
  const firstDateDay = getFirstDateDay(year, month);
  return Math.ceil((lastDate + firstDateDay) / 7);
};

export const getMonthStringWithoutYear = (str: string) => {
  return Object.keys(MONTHS)[Number(removeLeadingZero(str.split('-')[1])) - 1];
};

export const getEmotionTheme = (type: EmotionType, level: EmotionLevel) => {
  return emotionTheme[type][level];
};

export const toSingle = <T>(value: T | T[]): T => {
  return Array.isArray(value) ? value[0] : value;
};
