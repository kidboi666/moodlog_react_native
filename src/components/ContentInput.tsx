import React from 'react';
import { InputProps, ScrollView, TextArea, YStack } from 'tamagui';
import { useTranslation } from 'react-i18next';

interface Props extends InputProps {
  contentValue?: string;
  onContentChange: (content: string) => void;
}

export const ContentInput = ({
  fontSize,
  contentValue,
  onContentChange,
  ...props
}: Props) => {
  const { t } = useTranslation();

  return (
    <YStack
      flex={1}
      gap="$4"
      animation="quick"
      enterStyle={{ opacity: 0, scale: 0.95 }}
      animateOnly={['opacity', 'transform']}
    >
      <ScrollView flex={1}>
        <TextArea
          value={contentValue}
          onChangeText={onContentChange}
          unstyled
          multiline
          fontSize={fontSize}
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
