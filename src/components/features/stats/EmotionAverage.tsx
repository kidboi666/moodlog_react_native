import { Button, Card, H1, H3, Text, XStack } from 'tamagui';
import { emotionTheme } from '@/constants/themes';
import { useTranslation } from 'react-i18next';
import { SignatureEmotion } from '@/types/entries';
import { Maximize2 } from '@tamagui/lucide-icons';
import { PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';

interface Props {
  signatureEmotion: SignatureEmotion;
}

export const EmotionAverage = ({ signatureEmotion }: Props) => {
  const { t } = useTranslation();
  return (
    <Card
      animation="quick"
      animateOnly={PRESS_STYLE_KEY}
      pressStyle={PRESS_STYLE}
      bg={emotionTheme[signatureEmotion.type].zero}
      rounded="$8"
      flex={1}
    >
      <Card.Header>
        <H3>{t('record.stats.emotion.title')}</H3>
        <Text>{t('record.stats.emotion.description')}</Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1}>
          <H1>{t(`emotion.type.${signatureEmotion.type}`)}</H1>
        </XStack>
        <Button
          unstyled
          self="flex-end"
          bg="transparent"
          opacity={0.2}
          icon={<Maximize2 size="$1" />}
        />
      </Card.Footer>
    </Card>
  );
};
