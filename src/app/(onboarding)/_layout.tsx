import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { OnboardingHeader } from '@/components/headers/OnboardingHeader';
import { StepProgressContextProvider } from '@/store/contexts/PageProgressContext';

export default function OnboardingLayout() {
  const theme = useTheme();

  return (
    <StepProgressContextProvider totalSteps={3}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => <OnboardingHeader />,
          contentStyle: {
            backgroundColor: theme.background.val,
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="(onboarding)/index"
          options={{
            animation: 'fade',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="(onboarding)/nickname"
          options={{
            animation: 'fade',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="(onboarding)/signup"
          options={{
            animation: 'fade',
            gestureEnabled: true,
          }}
        />
      </Stack>
    </StepProgressContextProvider>
  );
}
