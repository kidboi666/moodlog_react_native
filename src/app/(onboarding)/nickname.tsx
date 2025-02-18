import { Container } from '@/components/Container';
import { Button, Form, H2, H3, Input, YStack } from 'tamagui';
import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { PARAGRAPH_DELAY } from '@/constants/styles';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');

  const handleChangeNicknameInput = (nickname: string) => {
    setNickname(nickname);
  };

  return (
    <Container>
      <Form flex={1}>
        <YStack flex={1} gap="$6">
          <FadeIn delay={PARAGRAPH_DELAY.FIRST}>
            <H2>Your story starts here</H2>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.SECOND}>
            <H3 color="$gray11">what name will you write it under?</H3>
          </FadeIn>
          <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
            <Input
              value={nickname}
              onChangeText={handleChangeNicknameInput}
              placeholder="Enter your story name"
            />
          </FadeIn>
        </YStack>
        <FadeIn delay={PARAGRAPH_DELAY.THIRD}>
          <Form.Trigger asChild>
            <Button
              themeInverse
              disabled={!nickname}
              opacity={!nickname ? 0.2 : 1}
            >
              Submit
            </Button>
          </Form.Trigger>
        </FadeIn>
      </Form>
    </Container>
  );
}
