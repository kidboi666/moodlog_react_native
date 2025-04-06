import { OnboardingHeader } from '@/core/components/features/onboarding/OnboardingHeader';
import { StepProgressContextProvider } from '@/core/store/contexts/step-progress.context';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default function Layout() {
  const theme = useTheme();

  return (
    <StepProgressContextProvider totalSteps={3}>
      <Stack
        initialRouteName="welcome"
        screenOptions={{
          headerShown: true,
          header: () => <OnboardingHeader />,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          animation: 'fade',
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="nickname" />
        <Stack.Screen name="signup" />
      </Stack>
    </StepProgressContextProvider>
  );
}
