import { Tabs, usePathname, useRouter } from 'expo-router';
import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { WriteHeader } from '@/components/headers/WriteHeader'; // expo 아이콘 사용

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const isWritePage = pathname.startsWith('/write');
  return (
    <Tabs
      initialRouteName="(drawers)"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="(drawers)"
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          headerShown: true,
          header: () => <WriteHeader />,
          tabBarButton: props =>
            isWritePage ? null : (
              <Button
                icon={Plus}
                position="absolute"
                b="$4"
                r="$4"
                size="$6"
                elevate
                themeInverse
                onPress={() => router.push('/write')}
              />
            ),
        }}
      />
    </Tabs>
  );
}
