import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useFontSizeAdjustment } from '@/hooks/useFontSizeAdjustment'
import type { ISODateString } from '@/types'
import { getDateFromISODate, getDayIndexFromISODate } from '@/utils'
import * as S from './DateHeader.styled'

interface DateHeaderProps {
  date: string
}

// 요일 문자열 배열 (일요일부터 토요일까지)
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export const DateHeader = ({ date }: DateHeaderProps) => {
  const { i18n } = useTranslation()
  const fontSize = useFontSizeAdjustment('$6')
  const smallFontSize = useFontSizeAdjustment('$4')

  const dateInfo = useMemo(() => {
    // date는 ISO 포맷(YYYY-MM-DD)의 문자열입니다.
    const dateObj = new Date(date)
    const dayOfWeek = getDayIndexFromISODate(date as ISODateString)
    const dayOfMonth = getDateFromISODate(date as ISODateString)
    const dateArr = date.split('-')
    const monthNum = Number.parseInt(dateArr[1], 10)

    // 월 표시 (한국어는 '월'을 붙임)
    const monthDisplay =
      i18n.language === 'ko'
        ? `${monthNum}월`
        : dateObj.toLocaleString(i18n.language, { month: 'short' })

    return {
      day: String(dayOfMonth),
      month: monthDisplay,
      weekday: WEEKDAYS[dayOfWeek],
      fullDate: dateObj.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }
  }, [date, i18n.language])

  return (
    <S.DateHeaderContainer>
      {/* 날짜 표시 원형 컨테이너 */}
      <S.DateCircle>
        <S.DateTextStack>
          <S.DayText fontSize={fontSize}>{dateInfo.day}</S.DayText>
          <S.WeekdayText fontSize={smallFontSize}>
            {dateInfo.weekday}
          </S.WeekdayText>
        </S.DateTextStack>
      </S.DateCircle>

      {/* 월 표시 */}
      <S.MonthText fontSize={fontSize}>{dateInfo.month}</S.MonthText>

      {/* 구분선 */}
      <S.Divider />
    </S.DateHeaderContainer>
  )
}
