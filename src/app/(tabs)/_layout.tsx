import { Tabs } from 'expo-router';
import { Home, PersonStanding, Plus } from '@tamagui/lucide-icons';
import { View } from 'tamagui';
import { WriteTabButton } from '@/components/tabs/WriteTabButton';
import { CommonTabButton } from '@/components/tabs/CommonTabButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarActiveTintColor: '$red11',
        tabBarInactiveTintColor: '$black',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: props => (
            <CommonTabButton onPress={props.onPress}>
              {props.children}
            </CommonTabButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <Home color={color as any} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: 'Write',
          tabBarButton: props => (
            <View flex={1}>
              <WriteTabButton onPress={props.onPress}>
                <Plus
                  color={
                    props.accessibilityState?.selected ? '$red11' : '$gray7'
                  }
                />
              </WriteTabButton>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: props => (
            <CommonTabButton onPress={props.onPress}>
              {props.children}
            </CommonTabButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <PersonStanding color={color as any} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
