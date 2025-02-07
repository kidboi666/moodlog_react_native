import { Tabs } from 'expo-router';
import { Home, PersonStanding, Plus } from '@tamagui/lucide-icons';
import { View } from 'tamagui';
import * as S from '@/components/tabs/tabs.styled';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FBF8F0',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarActiveTintColor: '$color.red700',
        tabBarInactiveTintColor: '$color.beige800',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: props => (
            <S.AnimatedTabButton onPress={props.onPress}>
              {props.children}
            </S.AnimatedTabButton>
          ),
          tabBarIcon: ({ color, focused, size }) => (
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
              <S.WriteTabButton onPress={props.onPress}>
                <Plus
                  color={
                    props.accessibilityState?.selected
                      ? '$color.red700'
                      : '$color.beige200'
                  }
                />
              </S.WriteTabButton>
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
            <S.AnimatedTabButton onPress={props.onPress}>
              {props.children}
            </S.AnimatedTabButton>
          ),
          tabBarIcon: ({ color, focused, size }) => (
            <PersonStanding color={color as any} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
