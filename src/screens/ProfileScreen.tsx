import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { Avatar, Card, H2, Paragraph, XStack } from 'tamagui';

export const ProfileScreen = () => {
  return (
    <Container>
      <XStack justify="center" t={10} z={1}>
        <Avatar circular bordered borderColor="$color.grey100" size="$10">
          <Avatar.Image
            source={{
              uri: 'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80',
            }}
          />
          <Avatar.Fallback bg="$color.blue400" />
        </Avatar>
      </XStack>
      <Card
        animation="medium"
        size="$4"
        scale={0.9}
        borderColor="$color.grey400"
        bg="$color.grey200"
        pressStyle={{ scale: 0.875, bg: '$color.green700' }}
        bordered
      >
        <Card.Header padded>
          <H2>Jack</H2>
          <Paragraph>Now available</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button>Purchase</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
