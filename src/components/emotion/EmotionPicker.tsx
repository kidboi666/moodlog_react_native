import { Button, Popover, Square, Text, XStack, YStack } from 'tamagui';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { IEmotion } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { ChevronDown } from '@tamagui/lucide-icons';
import React from 'react';

interface Props {
  selectedEmotion: IEmotion;
  onChangeEmotion: (emotion: IEmotion) => void;
}

const EmotionPickerBase = ({
  selectedEmotion,
  onChangeEmotion,
  emotionType,
}: Props & { emotionType: EmotionType }) => {
  return (
    <XStack gap="$4" justify="space-between" width="$16">
      <Text>{emotionType.toString().toUpperCase()}</Text>

      <XStack gap="$2">
        <Button
          unstyled
          onPress={() =>
            onChangeEmotion({
              type: emotionType,
              level: EmotionLevel.ZERO,
            })
          }
        >
          <Square rounded="$6" size="$4" bg={emotionTheme[emotionType].zero} />
        </Button>
        <Button
          unstyled
          onPress={() =>
            onChangeEmotion({
              type: emotionType,
              level: EmotionLevel.HALF,
            })
          }
        >
          <Square rounded="$6" size="$4" bg={emotionTheme[emotionType].half} />
        </Button>
        <Button
          unstyled
          onPress={() =>
            onChangeEmotion({
              type: emotionType,
              level: EmotionLevel.FULL,
            })
          }
        >
          <Square rounded="$6" size="$4" bg={emotionTheme[emotionType].full} />
        </Button>
      </XStack>
    </XStack>
  );
};

export const EmotionPicker = ({ selectedEmotion, onChangeEmotion }: Props) => {
  return (
    <Popover size="$4" placement="bottom">
      <Popover.Trigger asChild>
        <Button icon={ChevronDown}>Select Emotion</Button>
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack gap="$4">
          {Object.values(EmotionType).map((type, index) => (
            <EmotionPickerBase
              key={type}
              selectedEmotion={selectedEmotion}
              onChangeEmotion={onChangeEmotion}
              emotionType={type}
            />
          ))}
        </YStack>
      </Popover.Content>
    </Popover>
  );
};
