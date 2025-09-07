import { Tabs } from 'expo-router'
import { IconButton, useTheme } from 'react-native-paper'

export default function TabsLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarShowLabel: false,
        animation: 'fade',
        tabBarStyle: {
          borderTopWidth: 0,
          position: 'absolute',
          paddingTop: 14,
          height: 100,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: colors.elevation.level2,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          href: '/',
          tabBarIcon: ({ focused }) => (
            <IconButton icon='home' selected={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='entries'
        options={{
          href: '/entries',
          tabBarIcon: ({ focused }) => (
            <IconButton icon='book' selected={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='write'
        options={{
          href: '/write',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <IconButton icon='plus' mode='contained' selected={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='setting'
        options={{
          href: '/setting',
          tabBarIcon: ({ focused }) => (
            <IconButton icon='cog' selected={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
