import { Tabs } from 'expo-router';
import { Home, PersonStanding, Plus } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';
import { WriteTabButton } from '@/components/tabs/WriteTabButton';
import { CommonTabButton } from '@/components/tabs/CommonTabButton';
import { WriteHeader } from '@/components/headers/WriteHeader';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { VariableColorVal } from '@tamagui/web';

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { display: 'none' },
        headerStyle: {
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarActiveTintColor: theme.red11.val,
        tabBarInactiveTintColor: theme.gray11.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          animation: 'shift',
          header: () => <HomeHeader />,
          tabBarButton: props => (
            <CommonTabButton onPress={props.onPress}>
              {props.children}
            </CommonTabButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <Home color={color as keyof VariableColorVal} size={size} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: 'Write',
          animation: 'none',
          header: () => <WriteHeader />,
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: props => (
            <WriteTabButton
              icon={
                <Plus
                  color={theme.background.val as keyof VariableColorVal}
                  size="$1"
                />
              }
              onPress={props.onPress}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          animation: 'shift',
          header: () => <HomeHeader />,
          tabBarButton: props => (
            <CommonTabButton onPress={props.onPress}>
              {props.children}
            </CommonTabButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <PersonStanding
              color={color as keyof VariableColorVal}
              size={size}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
