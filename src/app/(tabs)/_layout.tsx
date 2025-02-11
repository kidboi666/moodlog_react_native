import { Tabs, usePathname, useRouter } from 'expo-router';
import { AnimatePresence, Button } from 'tamagui';
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
          tabBarButton: props => (
            <AnimatePresence>
              {!isWritePage && (
                <Button
                  icon={Plus}
                  animation="medium"
                  position="absolute"
                  b="$4"
                  r="$4"
                  size="$6"
                  elevate
                  themeInverse
                  onPress={() => router.push('/write')}
                  enterStyle={{
                    scale: 0,
                    opacity: 0,
                  }}
                  exitStyle={{
                    scale: 0,
                    opacity: 0,
                  }}
                />
              )}
            </AnimatePresence>
          ),
        }}
      />
    </Tabs>
  );
}
