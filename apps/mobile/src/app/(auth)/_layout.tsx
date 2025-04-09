import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

import { OnboardingHeader } from '@/core/components/features/onboarding/OnboardingHeader';
import { StepProgressProvider } from '@/core/store/step-progress.store';

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      initialRouteName="welcome"
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: theme.background.val,
        },
        animation: 'fade',
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
