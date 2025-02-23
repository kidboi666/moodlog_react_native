import React, { useRef } from 'react';
import { Input, InputProps, ScrollView, YStack } from 'tamagui';
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
  const firstInputRef = useRef<Input>(null);
  const secondInputRef = useRef<Input>(null);
  const { t } = useTranslation();

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
        placeholder={t('placeholder.journal.title')}
        placeholderTextColor="$gray7"
      />
      <ScrollView flex={1}>
        <Input
          value={contentValue}
          onChangeText={onChangeContentText}
          unstyled
          multiline
          fontSize={fontSize}
          ref={secondInputRef}
          scrollEnabled={false}
          placeholder={t('placeholder.journal.content')}
          placeholderTextColor="$gray7"
          flex={1}
          height="100%"
          color="$color"
          verticalAlign="top"
          pt={0}
          {...props}
        />
      </ScrollView>
    </YStack>
  );
};
