import React, { useRef } from 'react';
import { Input, InputProps, ScrollView, TextArea, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

interface Props extends InputProps {
  contentValue?: string;
  titleValue?: string;
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
}

export const ContentInput = ({
  fontSize,
  contentValue,
  titleValue,
  onContentChange,
  onTitleChange,
  ...props
}: Props) => {
  const firstInputRef = useRef<Input>(null);
  const secondInputRef = useRef<Input>(null);
  const { t } = useTranslation();

  const handleFirstLineSubmit = () => {
    secondInputRef.current?.focus();
  };

  return (
    <YStack
      flex={1}
      gap="$4"
      animation="quick"
      enterStyle={{ opacity: 0, scale: 0.95 }}
      animateOnly={['opacity', 'transform']}
    >
      <Input
        width="100%"
        value={titleValue}
        onChangeText={onTitleChange}
        unstyled
        fontSize="$9"
        fontWeight="700"
        my="$2"
        color="$color"
        ref={firstInputRef}
        onSubmitEditing={handleFirstLineSubmit}
        placeholder={t('placeholders.journal.title')}
        placeholderTextColor="$gray7"
      />
      <ScrollView flex={1}>
        <TextArea
          value={contentValue}
          onChangeText={onContentChange}
          unstyled
          multiline
          fontSize={fontSize}
          ref={secondInputRef}
          scrollEnabled={false}
          placeholder={t('placeholders.journal.content')}
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
