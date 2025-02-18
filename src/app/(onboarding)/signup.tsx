import { Button, Text, View, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@/store/hooks/useApp';

export default function SignupScreen() {
  const router = useRouter();
  const { setIsFirstLaunch } = useApp();

  const handleComplete = async (withSignup: boolean) => {
    try {
      // 온보딩 완료 상태 저장
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setIsFirstLaunch(false);

      if (withSignup) {
        // 회원가입 페이지로 이동
        router.push('/auth/signup');
      } else {
        // 로컬 모드로 시작
        router.replace('/');
      }
    } catch (error) {
      console.error('Failed to complete (onboarding):', error);
    }
  };

  return (
    <View flex={1} justify="center" p="$4">
      <YStack gap="$4">
        <Text fontFamily="$heading" fontSize="$6" text="center" mb="$4">
          Take Your Experience Further
        </Text>
        <Text fontSize="$4" text="center" color="$gray11">
          Sign up to unlock additional features:
        </Text>
        <YStack gap="$2" mt="$4">
          <Text color="$gray11">• Sync across devices</Text>
          <Text color="$gray11">• Secure backup</Text>
          <Text color="$gray11">• Advanced statistics</Text>
        </YStack>
        <XStack gap="$4" mt="$8">
          <Button
            flex={1}
            size="$4"
            onPress={() => handleComplete(false)}
            bg="$gray5"
          >
            Stay Local
          </Button>
          <Button
            flex={1}
            theme="active"
            size="$4"
            onPress={() => handleComplete(true)}
          >
            Sign Up
          </Button>
        </XStack>
      </YStack>
    </View>
  );
}
