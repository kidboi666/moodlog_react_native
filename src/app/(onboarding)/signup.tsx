import { Button, Text, View, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();

  const handleComplete = async (withSignup: boolean) => {
    try {
      if (withSignup) {
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
            with Google
          </Button>
        </XStack>
      </YStack>
    </View>
  );
}
