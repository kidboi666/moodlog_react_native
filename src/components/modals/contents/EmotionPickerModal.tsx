import {
  Button,
  ButtonProps,
  H3,
  Square,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { Emotion } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { useTranslation } from 'react-i18next';

interface Props extends ButtonProps {
  selectedEmotion?: Emotion;
  onChangeEmotion: (emotion: Emotion) => void;
}

export const EmotionPickerModal = ({
  selectedEmotion,
  onChangeEmotion,
}: Props) => {
  const { t } = useTranslation();

  return (
    <YStack gap="$6" p="$2">
      <H3>{t('placeholder.emotion')}</H3>
      {selectedEmotion?.type && (
        <XStack
          animation="bouncy"
          gap="$2"
          justify="center"
          enterStyle={ENTER_STYLE}
        >
          <H3 color="$gray11">
            {t(`emotion.level.${selectedEmotion?.level}`)}
          </H3>
          <H3>{t(`emotion.type.${selectedEmotion?.type}`)}</H3>
        </XStack>
      )}
      <XStack justify="space-between">
        <YStack justify="space-around" items="center">
          <View></View>
          {Object.values(EmotionLevel).map((level, index) => (
            <Text key={index} fontSize="$5" color="$gray11">
              {t(`emotion.level.${level}`)}
            </Text>
          ))}
        </YStack>

        {Object.values(EmotionType).map((type, index) => (
          <YStack key={index} gap="$4" justify="space-around" items="center">
            <Text key={index} fontSize="$6" color="$gray11">
              {t(`emotion.type.${type}`)}
            </Text>
            <YStack gap="$4">
              {Object.values(EmotionLevel).map(level => (
                <Button
                  key={type + level}
                  unstyled
                  animation="medium"
                  justify="center"
                  items="center"
                  pressStyle={PRESS_STYLE}
                  onPress={() =>
                    onChangeEmotion({
                      type,
                      level,
                    })
                  }
                  icon={
                    selectedEmotion?.type === type &&
                    selectedEmotion?.level === level ? (
                      <Check
                        position="absolute"
                        z="$1"
                        color={
                          level === EmotionLevel.ZERO ? '$gray10' : '$gray4'
                        }
                        size="$1"
                      />
                    ) : null
                  }
                >
                  <Square
                    rounded="$6"
                    size="$4"
                    bg={emotionTheme[type][level]}
                  />
                </Button>
              ))}
            </YStack>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};
