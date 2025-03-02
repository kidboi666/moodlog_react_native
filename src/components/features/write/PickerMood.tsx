import { Button, Square, Text, View, XStack, YStack } from 'tamagui';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { PRESS_STYLE } from '@/constants/styles';
import { Check } from '@tamagui/lucide-icons';
import { emotionTheme } from '@/constants/themes';
import React from 'react';
import { Emotion } from '@/types/entries';
import { useTranslation } from 'react-i18next';

interface Props {
  emotion?: Emotion;
  onEmotionChange: (emotion: Emotion) => void;
}

export const PickerMood = ({ onEmotionChange, emotion }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      animation="bouncy"
      enterStyle={{
        opacity: 0,
        y: 10,
      }}
      exitStyle={{
        opacity: 0,
        y: 10,
      }}
    >
      <XStack justify="space-between">
        {Object.values(EmotionType).map((type, index) => (
          <YStack key={index} gap="$4" items="center">
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
                    onEmotionChange({
                      type,
                      level,
                    })
                  }
                  icon={
                    emotion?.type === type && emotion?.level === level ? (
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
                    size="$5"
                    bg={emotionTheme[type][level]}
                  />
                </Button>
              ))}
            </YStack>
            <View key={index}>
              <Text fontSize="$4" color="$gray11" fontWeight="400">
                {t(`emotions.types.${type}`)}
              </Text>
            </View>
          </YStack>
        ))}
      </XStack>
    </View>
  );
};
