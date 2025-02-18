import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { OnboardingHeader } from '@/components/headers/OnboardingHeader';

export default function OnboardingLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <OnboardingHeader />,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen
        name="(onboarding)/index"
        options={{
          presentation: 'modal',
          animation: 'fade',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="(onboarding)/nickname"
        options={{
          presentation: 'modal',
          animation: 'fade',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="(onboarding)/signup"
        options={{
          presentation: 'modal',
          animation: 'fade',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
