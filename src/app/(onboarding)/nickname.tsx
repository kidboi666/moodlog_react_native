import { Container } from '@/components/containers/Container';
import { Button, Form, H2, H3, Input, YStack } from 'tamagui';
import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';
import { useUser } from '@/store/hooks/useUser';
import { useRouter } from 'expo-router';
import { useStepProgress } from '@/store/hooks/useStepProgress';

export default function NicknameScreen() {
  const { signUp } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const { goToNextStep } = useStepProgress();

  const handleChangeUserNameInput = (userName: string) => {
    setUserName(userName);
  };

  const handleSubmit = () => {
    if (!userName) return;

    goToNextStep();
    signUp(userName);
    router.push('/(onboarding)/signup');
  };

  return (
    <Container edges={['bottom']}>
      <Form onSubmit={handleSubmit} flex={1}>
        <YStack flex={1} gap="$6">
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <H2>Your story starts here</H2>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <H3 color="$gray11">what name will you write it under?</H3>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
            <Input
              value={userName}
              onChangeText={handleChangeUserNameInput}
              placeholder="Enter your name"
            />
          </FadeIn>
        </YStack>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <Form.Trigger asChild>
            <Button
              themeInverse
              disabled={!userName}
              opacity={!userName ? 0.2 : 1}
            >
              Submit
            </Button>
          </Form.Trigger>
        </FadeIn>
      </Form>
    </Container>
  );
}
