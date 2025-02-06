import { Tabs } from 'expo-router';
import { Atom, PersonStanding, Plus } from '@tamagui/lucide-icons';
import { Button, styled, View } from 'tamagui';

const AnimatedButton = styled(Button, {
  rounded: '$8',
  flex: 1,
  p: '$5',
  animation: 'quick',
  pressStyle: {
    scale: 0.95,
    opacity: 0.9,
  },
  hoverStyle: {
    scale: 1.1,
  },
  shadowColor: '$color.beige900',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  bg: '$color.beige900',
  enterStyle: {
    scale: 0.9,
    opacity: 0,
    y: 10,
  },
  exitStyle: {
    scale: 0.9,
    opacity: 0,
    y: 10,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 20,
          position: 'absolute',
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Atom color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: 'Write',
          tabBarButton: props => (
            <View flex={1}>
              <AnimatedButton onPress={props.onPress}>
                <Plus
                  color={
                    props.accessibilityState?.selected
                      ? '$color.blue700'
                      : '$color.beige400'
                  }
                />
              </AnimatedButton>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <PersonStanding color={color as any} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
