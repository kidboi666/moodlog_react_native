import { Button, Circle, useTheme } from 'tamagui';
import { Tabs } from 'expo-router';
import { Home, Plus, Settings } from '@tamagui/lucide-icons';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import React from 'react';
import { useDraft } from '@/store/hooks/useDraft';
import { TAB_BAR_HEIGHT } from '@/constants/size';

export default function DrawerLayout() {
  const theme = useTheme();
  const { draft } = useDraft();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarVisibilityAnimationConfig: {
            show: {
              animation: 'timing',
            },
            hide: {
              animation: 'timing',
            },
          },
          animation: 'fade',
          sceneStyle: { backgroundColor: theme.background.val },
          tabBarStyle: {
            backgroundColor: theme.gray5.val,
            borderTopWidth: 0,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 10,
            height: TAB_BAR_HEIGHT,
          },
          tabBarItemStyle: {
            margin: 5,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarButton: ({ onPress, children }) => (
              <Button
                unstyled
                justify="center"
                items="center"
                p="$4"
                pl="$8"
                animation="bouncy"
                animateOnly={['color', ...ENTER_STYLE_KEY]}
                enterStyle={ENTER_STYLE}
                onPress={onPress}
                pressStyle={PRESS_STYLE}
              >
                {children}
              </Button>
            ),
            tabBarIcon: ({ focused }) => (
              <Home size="$1" color={focused ? '$gray12' : '$gray11'} />
            ),
          }}
        />
        <Tabs.Screen
          name="write"
          options={{
            title: 'Write',
            tabBarButton: ({ onPress, children }) => (
              <Button
                unstyled
                items="center"
                p="$4"
                m="auto"
                width="$8"
                height="$6"
                rounded="$8"
                bg="$gray1"
                themeInverse
                b="$4"
                onPress={onPress}
                animation="bouncy"
                animateOnly={ENTER_STYLE_KEY}
                enterStyle={ENTER_STYLE}
                pressStyle={PRESS_STYLE}
              >
                {children}
              </Button>
            ),
            tabBarIcon: () => (
              <>
                <Plus size="$1" color="$gray12" />
                {(draft.content || draft.emotion?.type) && (
                  <Circle
                    position="absolute"
                    l={-8}
                    t={-8}
                    rounded="$4"
                    bg="$green9"
                    size="$0.75"
                  />
                )}
              </>
            ),
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarButton: ({ onPress, children }) => (
              <Button
                unstyled
                justify="center"
                items="center"
                p="$4"
                pr="$8"
                animation="bouncy"
                animateOnly={ENTER_STYLE_KEY}
                enterStyle={ENTER_STYLE}
                onPress={onPress}
                pressStyle={PRESS_STYLE}
              >
                {children}
              </Button>
            ),
            tabBarIcon: ({ focused }) => (
              <Settings size="$1" color={focused ? '$gray12' : '$gray11'} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
