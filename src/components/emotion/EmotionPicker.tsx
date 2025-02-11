import {
  Button,
  ButtonProps,
  Popover,
  Square,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { EmotionLevel, EmotionType } from '@/types/enums';
import { IEmotion } from '@/types/entries';
import { emotionTheme } from '@/constants/themes';
import { ChevronDown } from '@tamagui/lucide-icons';
import React from 'react';

interface Props extends ButtonProps {
  selectedEmotion?: IEmotion;
  onChangeEmotion: (emotion: IEmotion) => void;
}

const EmotionPickerBase = ({
  selectedEmotion,
  onChangeEmotion,
  emotionType,
}: Props & { emotionType: EmotionType }) => {
  return (
    <XStack gap="$4" justify="space-between" items="center" width="$16">
      <Text>{emotionType.toString().toUpperCase()}</Text>

      <XStack gap="$2">
        <Button
          unstyled
          animation="medium"
          pressStyle={{
            scale: 0.95,
            opacity: 0.5,
          }}
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
          animation="medium"
          pressStyle={{
            scale: 0.95,
            opacity: 0.5,
          }}
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
          animation="medium"
          pressStyle={{
            scale: 0.95,
            opacity: 0.5,
          }}
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

export const EmotionPicker = ({
  selectedEmotion,
  onChangeEmotion,
  ...props
}: Props) => {
  return (
    <Popover size="$4" placement="bottom">
      <Popover.Trigger asChild>
        <Button
          unstyled
          animation="quick"
          flexDirection="row"
          gap="$1"
          items="center"
          icon={ChevronDown}
          pressStyle={{
            scale: 0.95,
            opacity: 0.5,
          }}
          {...props}
        >
          Select Emotion
          {selectedEmotion?.type && selectedEmotion?.level && (
            <Square
              size="$1"
              bg={emotionTheme[selectedEmotion.type][selectedEmotion.level]}
              rounded="$3"
            />
          )}
        </Button>
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
