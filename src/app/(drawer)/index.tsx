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
import { Redirect } from 'expo-router';
import { useApp } from '@/store/hooks/useApp';
import { Floating } from '@/components/Floating';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { HOME_HEADER_LINE_HEIGHT } from '@/constants/size';
import { ShakeHand } from '@/components/ShakeHand';
import { WeekDayPicker } from '@/components/WeekDayPicker';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/store/hooks/useUser';
import { useScroll } from '@/store/hooks/useScroll';

export default function DrawerScreen() {
  const { dailyJournals } = useJournal();
  const { isInitialApp } = useApp();
  const { t } = useTranslation();
  const { onScroll } = useScroll();
  const { userInfo } = useUser();

  if (!isInitialApp) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return (
    <Container>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          pb: 80,
        }}
      >
        <YStack gap="$3">
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <XStack gap="$2" items="flex-end">
              <H2 lineHeight={HOME_HEADER_LINE_HEIGHT}>
                {t('common.greeting.hello')}
              </H2>
              <ShakeHand />
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

        {dailyJournals.length === 0 ? (
          <EmptyJournal />
        ) : (
          dailyJournals.map((journal, index) => (
            <View key={journal.id}>
              {index > 0 && <Separator borderColor="transparent" mb="$4" />}
              <JournalCard journal={journal} index={index} />
            </View>
          ))
        )}
      </ScrollView>
      <Floating />
    </Container>
  );
}
