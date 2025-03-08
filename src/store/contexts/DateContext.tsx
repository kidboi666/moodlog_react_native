import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { DateStore } from '@/types/store';
import { Nullable } from '@/types/utils';
import { ISODateString, ISOMonthString } from '@/types/dtos/date';
import { CalendarUtils } from 'react-native-calendars';
import { getMonthInISODateString } from '@/utils/common';
import { ContextName } from '@/types/enums';

// 액션 타입 정의
type DateAction =
  | { type: 'SET_SELECTED_YEAR'; payload: number }
  | { type: 'SET_SELECTED_MONTH'; payload: Nullable<ISOMonthString> }
  | { type: 'SET_SELECTED_DATE'; payload: ISODateString }
  | {
      type: 'INIT_SELECTED_DATES';
      payload: {
        currentYear: number;
        currentMonth: number;
        initialISODate: ISODateString;
      };
    };

// 상태 타입 정의
interface DateState {
  selectedYear: number;
  selectedMonth: Nullable<ISOMonthString>;
  selectedDate: ISODateString;
}

// 컴포넌트 외부에 리듀서 함수 정의
const dateReducer = (state: DateState, action: DateAction): DateState => {
  switch (action.type) {
    case 'SET_SELECTED_YEAR':
      return { ...state, selectedYear: action.payload };
    case 'SET_SELECTED_MONTH':
      return { ...state, selectedMonth: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    case 'INIT_SELECTED_DATES': {
      const { currentYear, currentMonth, initialISODate } = action.payload;
      return {
        selectedYear: currentYear,
        selectedMonth: getMonthInISODateString(currentYear, currentMonth),
        selectedDate: initialISODate,
      };
    }
    default:
      return state;
  }
};

export const CreateDateContext = (contextName: ContextName) => {
  const Context = createContext<Nullable<DateStore>>(null);

  Context.displayName = `${contextName}DateContext`;

  const Provider = ({ children }: PropsWithChildren) => {
    // 현재 날짜 값 (한 번만 계산됨)
    const currentDate = useMemo(() => new Date(), []);
    const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
    const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
    const initialISODate = useMemo(
      () => CalendarUtils.getCalendarDateString(currentDate),
      [currentDate],
    );

    // 리듀서 초기 상태
    const initialState: DateState = useMemo(
      () => ({
        selectedYear: currentYear,
        selectedMonth: null,
        selectedDate: initialISODate,
      }),
      [currentYear, initialISODate],
    );

    // 리듀서 사용
    const [state, dispatch] = useReducer(dateReducer, initialState);

    // 액션 디스패처 (메모이제이션된 콜백)
    const handleSelectedYearChange = useCallback((year: number) => {
      dispatch({ type: 'SET_SELECTED_YEAR', payload: year });
    }, []);

    const handleSelectedMonthChange = useCallback(
      (month: Nullable<ISOMonthString>) => {
        dispatch({ type: 'SET_SELECTED_MONTH', payload: month });
      },
      [],
    );

    const handleSelectedDateChange = useCallback((date: ISODateString) => {
      dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    }, []);

    const initSelectedDates = useCallback(() => {
      dispatch({
        type: 'INIT_SELECTED_DATES',
        payload: { currentYear, currentMonth, initialISODate },
      });
    }, [currentYear, currentMonth, initialISODate]);

    // 컨텍스트 값 생성 (메모이제이션)
    const contextValue = useMemo(
      () => ({
        // 현재 날짜 정보 (정적)
        currentMonth,
        currentYear,
        currentDate,
        // 선택된 날짜 상태 (리듀서에서)
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        selectedDate: state.selectedDate,
        // 액션
        initSelectedDates,
        onSelectedYearChange: handleSelectedYearChange,
        onSelectedMonthChange: handleSelectedMonthChange,
        onSelectedDateChange: handleSelectedDateChange,
      }),
      [
        currentMonth,
        currentYear,
        currentDate,
        state.selectedYear,
        state.selectedMonth,
        state.selectedDate,
        initSelectedDates,
        handleSelectedYearChange,
        handleSelectedMonthChange,
        handleSelectedDateChange,
      ],
    );

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  return {
    Provider,
    Context,
  };
};

export const { Provider: CalendarDateProvider, Context: CalendarDateContext } =
  CreateDateContext('calendar');
export const { Provider: WeekDateProvider, Context: WeekDateContext } =
  CreateDateContext('week');
export const {
  Provider: StatisticDateProvider,
  Context: StatisticDateContext,
} = CreateDateContext('statistic');
export const { Provider: GlobalDateProvider, Context: GlobalDateContext } =
  CreateDateContext('global');
