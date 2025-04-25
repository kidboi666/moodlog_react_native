import React, { useState } from 'react'
import { ScrollView, YStack } from 'tamagui'

import {
  HomeJournalCardContainer,
  WeekDay,
  WelcomeZone,
} from '@/features/home/components'
import { ViewContainer } from '@/shared/components'

export default function HomeScreen() {
  return (
    <ScrollView overScrollMode='always' keyboardShouldPersistTaps='handled'>
      <ViewContainer edges={['top', 'bottom']} padded>
        <YStack gap='$4'>
          <WelcomeZone />
          <WeekDay />
          <HomeJournalCardContainer />
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}
