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
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import React from 'react';
import { EnterStyle, PressStyle } from '@/constants/styles';

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
        {Object.values(EmotionLevel).map(level => (
          <Button
            key={emotionType + level}
            unstyled
            animation="medium"
            justify="center"
            items="center"
            pressStyle={PressStyle}
            onPress={() =>
              onChangeEmotion({
                type: emotionType,
                level,
              })
            }
            icon={
              selectedEmotion?.type === emotionType &&
              selectedEmotion?.level === level ? (
                <Check
                  position="absolute"
                  z="$1"
                  color={level === EmotionLevel.ZERO ? '$gray10' : '$gray4'}
                  size="$1"
                />
              ) : null
            }
          >
            <Square
              rounded="$6"
              size="$4"
              bg={emotionTheme[emotionType][level]}
            />
          </Button>
        ))}
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
          borderWidth={0}
          p="$2"
          color="$gray11"
          items="center"
          icon={<ChevronDown size="$1" />}
          pressStyle={PressStyle}
          fontSize="$5"
          {...props}
        >
          Select Emotion
          {selectedEmotion?.type && selectedEmotion?.level && (
            <Square
              animation="quick"
              size="$1"
              bg={emotionTheme[selectedEmotion.type][selectedEmotion.level]}
              rounded="$3"
              enterStyle={EnterStyle}
            />
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevation="$1"
        style={{
          zIndex: 99999,
        }}
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
