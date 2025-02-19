import { Button, H1, H3, Text, View, YStack } from 'tamagui';
import { useUser } from '@/store/hooks/useUser';
import { Container } from '@/components/containers/Container';

export default function SignupScreen() {
  const { setIsInitialUser } = useUser();

  const handleComplete = async () => {
    setIsInitialUser(true);
  };

  return (
    <Container edges={['bottom']}>
      <YStack gap="$4" flex={1}>
        <H1>Take Your Experience Further</H1>
        <YStack bg="$gray12" p="$5" gap="$4" rounded="$8">
          <H3 color="$gray1">Sign up to unlock additional features:</H3>
          <YStack gap="$2">
            <Text color="$gray2">• Sync across devices</Text>
            <Text color="$gray2">• Secure backup</Text>
            <Text color="$gray2">• Advanced statistics</Text>
          </YStack>
        </YStack>
        <View flex={1} />
        <Button themeInverse onPress={handleComplete}>
          Alright
        </Button>
      </YStack>
    </Container>
  );
}
