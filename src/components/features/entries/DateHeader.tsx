import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import { useFontSizeAdjustment } from '@/hooks'
import type { ISODateString } from '@/types'
import { DateUtils } from '@/utils'

// 요일 문자열 배열 (일요일부터 토요일까지)
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

interface DateHeaderProps {
  date: string
}

export function DateHeader({ date }: DateHeaderProps) {
  const { i18n } = useTranslation()
  const fontSize = useFontSizeAdjustment('$6')
  const smallFontSize = useFontSizeAdjustment('$4')
  const dateInfo = useMemo(() => {
    // date는 ISO 포맷(YYYY-MM-DD)의 문자열입니다.
    const dateObj = new Date(date)
    const dayOfWeek = DateUtils.getDayIndexFromISODate(date as ISODateString)
    const dayOfMonth = DateUtils.getDateFromISODate(date as ISODateString)
    const dateArr = date.split('-')
    const monthNum = Number(dateArr[1])

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
    <DateHeaderContainer>
      {/* 날짜 표시 원형 컨테이너 */}
      <DateCircle>
        <DateTextStack>
          <DayText fontSize={fontSize}>{dateInfo.day}</DayText>
          <WeekdayText fontSize={smallFontSize}>{dateInfo.weekday}</WeekdayText>
        </DateTextStack>
      </DateCircle>

      {/* 월 표시 */}
      <MonthText fontSize={fontSize}>{dateInfo.month}</MonthText>

      {/* 구분선 */}
      <Divider />
    </DateHeaderContainer>
  )
}

const DateHeaderContainer = styled(XStack, {
  mt: '$6',
  mb: '$3',
  px: '$2',
  items: 'center',
  gap: '$3',
})

const DateCircle = styled(XStack, {
  width: 52,
  height: 52,
  rounded: 26,
  bg: '$gray2',
  borderWidth: 1,
  borderColor: '$gray4',
  justify: 'center',
  items: 'center',
  shadowColor: '$gray8',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
})

const DateTextStack = styled(YStack, {
  items: 'center',
})

const DayText = styled(BaseText, {
  fontWeight: '800',
  color: '$gray12',
})

const WeekdayText = styled(BaseText, {
  fontWeight: '500',
  color: '$gray10',
})

const MonthText = styled(BaseText, {
  fontWeight: '600',
  color: '$gray11',
})

const Divider = styled(XStack, {
  flex: 1,
  height: 1,
  bg: '$gray4',
})
