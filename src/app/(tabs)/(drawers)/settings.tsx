import { Container } from '@/components/shared/Container';
import { Button, YStack } from 'tamagui';

export default function Settings() {
  return (
    <Container
      animation="medium"
      enterStyle={{
        x: -300,
        opacity: 0,
      }}
    >
      <YStack flex={1} width="$20">
        <Button>Go Home</Button>
      </YStack>
    </Container>
  );
}
