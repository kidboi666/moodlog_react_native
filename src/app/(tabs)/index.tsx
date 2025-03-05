import {
  H2,
  H3,
  H4,
  ScrollView,
  Separator,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { JournalCard } from '@/components/JournalCard';
import { Container } from '@/components/layouts/containers/Container';
import { EmptyJournal } from '@/components/EmptyJournal';
import { Redirect, useFocusEffect } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { HOME_HEADER_LINE_HEIGHT } from '@/constants/size';
import { ShakeEmoji } from '@/components/ShakeEmoji';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/store/hooks/useUser';
import { useScroll } from '@/store/hooks/useScroll';
import { useDate } from '@/store/hooks/useDate';
import { CalendarUtils } from 'react-native-calendars';

export default function HomeScreen() {
  const { dailyJournals } = useJournal();
  const { onSelectedDateChange, currentDate } = useDate();
  const { isInitialApp } = useApp();
  const { t } = useTranslation();
  const { onScroll } = useScroll();
  const { userInfo } = useUser();

  useFocusEffect(
    useCallback(() => {
      onSelectedDateChange(CalendarUtils.getCalendarDateString(currentDate));
    }, []),
  );

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      overScrollMode="always"
    >
      <Container edges={['top', 'bottom']}>
        <YStack gap="$3">
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <XStack gap="$2" items="flex-end">
              <H2 lineHeight={HOME_HEADER_LINE_HEIGHT}>
                {t('common.greeting.hello')}
              </H2>
              <ShakeEmoji emoji="👋" />
            </XStack>
            <H3>
              {t('common.greeting.welcome', { name: userInfo?.userName })}
            </H3>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <H4 color="$gray11">{t('common.greeting.howAreYou')}</H4>
          </FadeIn>
          <WeekDayPicker />
        </YStack>

        {Array.isArray(dailyJournals) ? (
          dailyJournals.map((journal, index) => (
            <View key={journal.id}>
              {index > 0 && <Separator borderColor="transparent" mb="$4" />}
              <FadeIn delay={100 * (index + 1)}>
                <JournalCard journal={journal} />
              </FadeIn>
            </View>
          ))
        ) : (
          <EmptyJournal date={dailyJournals} />
        )}
      </Container>
    </ScrollView>
  );
}
