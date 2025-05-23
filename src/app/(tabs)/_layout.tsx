import { Redirect } from 'expo-router'
import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui'
import React from 'react'
import { StyleSheet } from 'react-native'

import { TabButton, WriteButton } from '@/components/features/tab'
import { ContainerFog } from '@/components/shared'
import { useThemedStyles } from '@/hooks'
import { useAuth } from '@/store'

export default function TabsLayout() {
  const session = useAuth(state => state.session)

  if (!session) {
    return <Redirect href='/(onboarding)/intro' />
  }

  const themedStyles = useThemedStyles(({ colors }) => ({
    list: {
      backgroundColor: colors.background.primary,
    },
  }))

  return (
    <>
      <Tabs>
        <TabSlot />
        <TabList style={[styles.list, themedStyles.list]}>
          <TabTrigger name='home' href='/' asChild>
            <TabButton icon='home' />
          </TabTrigger>
          <TabTrigger name='entries' href='/entries' asChild>
            <TabButton icon='book' />
          </TabTrigger>

          <WriteButton />
          <TabTrigger name='statistic' href='/statistic' asChild>
            <TabButton icon='chart-bar' />
          </TabTrigger>
          <TabTrigger name='setting' href='/setting' asChild>
            <TabButton icon='cog' />
          </TabTrigger>
        </TabList>
      </Tabs>
      <ContainerFog />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    bottom: 14,
    borderRadius: 40,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
})
