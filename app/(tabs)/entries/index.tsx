import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'tamagui'

import { ANIMATION_DELAY_MS, DELETE_JOURNAL_SNAP_POINTS } from '@/constants'
import { useCalendar } from '@/hooks'
import { useBottomSheet, useJournal } from '@/store'
import { BottomSheetType, type Journal } from '@/types'

import { DateHeader } from '@/components/features/entries/DateHeader'
import { GardenSection } from '@/components/features/entries/GardenSection'
import { EmptyJournal } from '@/components/features/journal/EmptyJournal'
import { JournalCard } from '@/components/features/journal/JournalCard'
import { FadeIn } from '@/components/shared/FadeIn.styleable'
import * as S from '@/styles/screens/entries/Entries.styled'

// 일기를 날짜별로 그룹화하는 함수
const groupJournalsByDate = (journals: Journal[]) => {
  const groupedJournals: Record<string, Journal[]> = {}

  journals.forEach(journal => {
    const dateKey = journal.localDate

    if (!groupedJournals[dateKey]) {
      groupedJournals[dateKey] = []
    }

    groupedJournals[dateKey].push(journal)
  })

  // 날짜별로 정렬 (최신 날짜가 먼저 오도록)
  return Object.entries(groupedJournals).sort(([dateA], [dateB]) =>
    dateB.localeCompare(dateA),
  )
}

export default function Screen() {
  const selectedJournals = useJournal(state => state.selectedJournals)
  const isLoading = useJournal(state => state.isLoading)
  const selectJournals = useJournal(state => state.selectJournals)
  const removeJournal = useJournal(state => state.removeJournal)
  const { showBottomSheet, hideBottomSheet } = useBottomSheet()

  const { selectedMonth } = useCalendar()
  const { t } = useTranslation()

  // 일기 목록을 날짜별로 그룹화
  const groupedJournals = useMemo(() => {
    if (!Array.isArray(selectedJournals) || selectedJournals.length === 0) {
      return []
    }
    return groupJournalsByDate(selectedJournals)
  }, [selectedJournals])

  const openDeleteSheet = useCallback(
    (id: string) => {
      showBottomSheet(
        BottomSheetType.DELETE_JOURNAL,
        DELETE_JOURNAL_SNAP_POINTS,
        {
          journalId: id,
          isLoading,
          onDelete: removeJournal,
          onSuccess: () => {
            selectJournals(selectedMonth)
          },
          hideBottomSheet,
        },
      )
    },
    [
      showBottomSheet,
      isLoading,
      selectedMonth,
      removeJournal,
      selectJournals,
      hideBottomSheet,
    ],
  )

  return (
    <ScrollView>
      <S.ViewContainer edges={['top']} padded>
        <S.Title>{t('entries.title')}</S.Title>
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
          <GardenSection />
        </FadeIn>

        <S.JournalBox>
          {Array.isArray(selectedJournals) && selectedJournals.length > 0 ? (
            groupedJournals.map(([date, journals]) => (
              <S.DateGroup key={date}>
                <DateHeader date={date} />
                {journals.map(journal => {
                  const { content, imageUri, id, createdAt, mood } = journal
                  return (
                    <JournalCard
                      key={id}
                      id={id}
                      content={content}
                      imageUri={imageUri}
                      createdAt={createdAt}
                      moodType={mood.type}
                      moodLevel={mood.level}
                      openDeleteSheet={openDeleteSheet}
                    />
                  )
                })}
              </S.DateGroup>
            ))
          ) : (
            <EmptyJournal isToday={false} />
          )}
        </S.JournalBox>
      </S.ViewContainer>
    </ScrollView>
  )
}
