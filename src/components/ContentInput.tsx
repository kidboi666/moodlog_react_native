import React, { useRef, useState } from 'react';
import { Button, Input, InputProps, View, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        width="100%"
        value={titleValue}
        onChangeText={onChangeTitleText}
        unstyled
        fontSize="$9"
        fontWeight="700"
        my="$2"
        color="$color"
        ref={firstInputRef}
        onSubmitEditing={handleFirstLineSubmit}
        placeholder={t('placeholder.journal')}
        placeholderTextColor="$gray7"
      />
      <Input
        value={contentValue}
        onChangeText={onChangeContentText}
        unstyled
        multiline
        fontSize={fontSize}
        ref={secondInputRef}
        scrollEnabled={false}
        pb="$4"
        color="$color"
        verticalAlign="top"
        {...props}
      />
      {!isFocused && (
        <View flex={1} bg="$blue2">
          <Button unstyled flex={1} onPress={handleFocusInput} />
        </View>
      )}
    </YStack>
  );
};
