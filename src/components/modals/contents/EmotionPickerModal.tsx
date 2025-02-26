import {
  Button,
  ButtonProps,
  H3,
  Square,
  Text,
  View,
  XStack,
  YStack,
  ZStack,
} from 'tamagui';
import { EmotionLevel, EmotionType } from 'src/types/enums';
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
      <H3>{t('placeholders.emotion')}</H3>
      {selectedEmotion?.type && (
        <XStack
          mb="$4"
          animation="bouncy"
          gap="$2"
          justify="center"
          enterStyle={ENTER_STYLE}
        >
          <H3 color="$gray11">
            {t(`emotions.levels.${selectedEmotion?.level}`)}
          </H3>
          <H3>{t(`emotions.types.${selectedEmotion?.type}`)}</H3>
        </XStack>
      )}
      <XStack justify="space-between">
        <YStack justify="space-around" items="center">
          <View></View>
          {Object.values(EmotionLevel).map((level, index) => (
            <Text key={index} fontSize="$5" color="$gray11">
              {t(`emotions.levels.${level}`)}
            </Text>
          ))}
        </YStack>

        {Object.values(EmotionType).map((type, index) => (
          <YStack key={index} gap="$4" items="center">
            <ZStack>
              <View position="absolute" x="-50%" t={-20}>
                <Text key={index} fontSize="$6" color="$gray11">
                  {t(`emotions.types.${type}`)}
                </Text>
              </View>
            </ZStack>
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
