import React, { useRef, useState } from 'react';
import { Button, Input, InputProps, View, YStack } from 'tamagui';

interface Props extends InputProps {
  contentValue?: string;
  titleValue?: string;
  onChangeContentText: (content: string) => void;
  onChangeTitleText: (title: string) => void;
}

export const ContentInput = ({
  fontSize,
  contentValue,
  titleValue,
  onChangeContentText,
  onChangeTitleText,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const firstInputRef = useRef<Input>(null);
  const secondInputRef = useRef<Input>(null);

  const handleFocusInput = () => {
    if (titleValue) {
      secondInputRef.current?.focus();
      setIsFocused(true);
    } else {
      firstInputRef.current?.focus();
    }
  };
  const handleFirstLineSubmit = () => {
    secondInputRef.current?.focus();
  };

  return (
    <YStack flex={1}>
      <Input
        value={titleValue}
        onChangeText={onChangeTitleText}
        unstyled
        fontSize="$9"
        my="$2"
        ref={firstInputRef}
        onSubmitEditing={handleFirstLineSubmit}
        placeholder="How are you feeling today?"
        placeholderTextColor="$gray7"
      />
      <Input
        value={contentValue}
        onChangeText={onChangeContentText}
        unstyled
        multiline
        fontSize={fontSize}
        flex={isFocused ? 1 : 0}
        ref={secondInputRef}
        pb="$4"
        color="$color"
        verticalAlign="top"
        {...props}
      />
      {!isFocused && (
        <View flex={1}>
          <Button unstyled flex={1} onPress={handleFocusInput} />
        </View>
      )}
    </YStack>
  );
};
