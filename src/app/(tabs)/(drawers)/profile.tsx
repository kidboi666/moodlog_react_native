import { Avatar, Button, Card, H2, Paragraph, XStack } from 'tamagui';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Container } from '@/components/shared/Container';

export default function ProfileScreen() {
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setKey(prev => prev + 1);
    }, []),
  );

  return (
    <Container
      key={key}
      enterStyle={{
        x: 300,
        opacity: 0,
      }}
    >
      <XStack justify="center" t={10} z={1}>
        <Avatar circular bordered borderColor="$gray5" size="$10">
          <Avatar.Image
            source={{
              uri: 'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80',
            }}
          />
          <Avatar.Fallback bg="$blue4" />
        </Avatar>
      </XStack>
      <Card
        animation="medium"
        size="$4"
        scale={0.9}
        bg="$gray5"
        borderColor="$gray4"
        pressStyle={{ scale: 0.95, bg: '$green4' }}
        bordered
      >
        <Card.Header padded>
          <H2 color="$gray12">Jack</H2>
          <Paragraph color="$gray11">Now available</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button animation="medium" bg="$color" color="$background">
            Purchase
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
