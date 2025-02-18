import { Container } from '@/components/Container';
import { Button, Form, H1, H2, Input, View, YStack } from 'tamagui';
import { useState } from 'react';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');

  const handleChangeNicknameInput = (nickname: string) => {
    setNickname(nickname);
  };

  return (
    <Container>
      <YStack flex={1} gap="$12">
        <View
          animation="bouncy"
          bg="$gray12"
          items="center"
          justify="space-evenly"
          rounded="$8"
          p="$3"
          flex={1}
          enterStyle={{
            y: -300,
          }}
        >
          <H1 color="$gray1" text="center">
            Your story starts here
          </H1>
          <H2 color="$gray1" text="center">
            what name will you write it under?
          </H2>
        </View>
        <Form gap="$4" flex={1}>
          <Input
            value={nickname}
            onChangeText={handleChangeNicknameInput}
            placeholder="Enter your story name"
          />
          <Form.Trigger asChild>
            <Button
              themeInverse
              disabled={!nickname}
              opacity={!nickname ? 0.2 : 1}
            >
              Submit
            </Button>
          </Form.Trigger>
        </Form>
      </YStack>
    </Container>
  );
}
