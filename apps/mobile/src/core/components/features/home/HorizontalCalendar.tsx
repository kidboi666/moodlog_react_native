import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'tamagui';

import * as S from 'src/core/components/features/home/HorizontalCalendar.styled';

import { DateCountDot } from '@/core/components/features/home/DateCountDot';
import { CALENDAR_SCROLL_SIZE } from '@/core/constants/size';
import { useCalendar } from '@/core/hooks/useCalendar';
import { useJournal } from '@/core/store/journal.store';

import { ISODateString } from '@/types/date.types';

import {
  getDateFromISODate,
  getDayFromISODate,
  getDayIndexFromISODate,
  getISODateString,
  getLastDate,
} from '@/utils/date';

export const HorizontalCalendar = () => {
  const selectJournals = useJournal(state => state.selectJournals);
  const getCountForDate = useJournal(state => state.getCountForDate);
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    currentYear,
    currentMonth,
    onSelectedDateChange,
    selectedDate,
    isToday,
    isFuture,
    isSelected,
  } = useCalendar();

  const handleCalendarDateChange = useCallback(
    (date: ISODateString) => {
      onSelectedDateChange(date);
      selectJournals(date);
    },
    [onSelectedDateChange, selectJournals],
  );

  const dates: Record<ISODateString, number> = useMemo(() => {
    const lastDate = getLastDate(currentYear, currentMonth);
    let datesWithJournalCount: Record<ISODateString, number> = {};

    for (let i = 1; i <= lastDate; i++) {
      const dateKey = getISODateString(currentYear, currentMonth, i);
      datesWithJournalCount[dateKey] = getCountForDate(
        currentYear,
        currentMonth,
        i,
      );
    }
    return datesWithJournalCount;
  }, [currentYear, currentMonth, getCountForDate]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (selectedDate) {
      const selectedIndex = getDateFromISODate(selectedDate);
      const day = getDayIndexFromISODate(selectedDate) || 7;
      timeout = setTimeout(() => {
        if (selectedIndex !== -1 && scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: (selectedIndex - day) * CALENDAR_SCROLL_SIZE,
            animated: true,
          });
        }
      }, 1300);
    }

    return () => clearTimeout(timeout);
  }, [dates, selectedDate]);

  useEffect(() => {
    selectJournals(selectedDate);
  }, []);

  return (
    <S.CalendarContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        snapToAlignment="start"
        snapToInterval={CALENDAR_SCROLL_SIZE}
      >
        {Object.entries(dates).map(([date, journalCount]) => {
          const isoDate = date as ISODateString;
          return (
            <S.DateContainer
              key={isoDate}
              isSelected={isSelected(isoDate)}
              isToday={isToday(isoDate)}
              onPress={() => handleCalendarDateChange(isoDate)}
            >
              <S.DateWrapper>
                <S.DateTextWrapper>
                  <S.DayText isSelected={isSelected(isoDate)}>
                    {t(`calendar.days.${getDayFromISODate(isoDate)}`)}
                  </S.DayText>
                  <S.DateText
                    futureDateColor={
                      isFuture(isoDate)
                        ? '$gray11'
                        : isSelected(isoDate)
                          ? '$gray12'
                          : '$gray6'
                    }
                  >
                    {getDateFromISODate(isoDate)}
                  </S.DateText>
                </S.DateTextWrapper>
                <DateCountDot
                  variant="contained"
                  journalCount={journalCount}
                  isSelected={isSelected(isoDate)}
                />
              </S.DateWrapper>
            </S.DateContainer>
          );
        })}
      </ScrollView>
    </S.CalendarContainer>
  );
};
