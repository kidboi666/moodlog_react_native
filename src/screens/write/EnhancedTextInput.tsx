import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { getToken, Input, ScrollView, TextArea, YStack } from 'tamagui';
import { Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ViewFontSize } from '@/types/enums';
import { Nullable } from '@/types/utils';

interface EnhancedTextInputProps {
  fontSize: ViewFontSize;
  imageUri?: Nullable<string>;
  contentValue?: string;
  onContentChange: (content: string) => void;
  autoFocus?: boolean;
}

export interface EnhancedTextInputRef {
  focus: () => void;
}

export const EnhancedTextInput = forwardRef<
  EnhancedTextInputRef,
  EnhancedTextInputProps
>(({ fontSize, contentValue, onContentChange, autoFocus, imageUri }, ref) => {
  const { t } = useTranslation();
  const firstInputRef = useRef<Input>(null);
  const secondInputRef = useRef<Input>(null);

  const contentLines = contentValue ? contentValue.split('\n') : [''];
  const firstLine = contentLines[0] || '';
  const restLines = contentLines.slice(1).join('\n');

  const handleTextChange = (type: 'first' | 'rest', text: string) => {
    if (type === 'first') {
      // 첫 번째 줄이 변경된 경우
      onContentChange(text + (restLines ? '\n' + restLines : ''));
    } else {
      // 나머지 줄이 변경된 경우
      onContentChange(firstLine + '\n' + text);
    }
  };

  const handleSubmitEditing = () => {
    moveToNextLine();
  };

  // 다음 줄로 이동하는 공통 함수
  const moveToNextLine = () => {
    // 엔터 키가 눌렸을 때, 개행 문자를 추가하여 다음 줄로 이동
    const newContent = firstLine + '\n' + restLines;
    onContentChange(newContent);

    // 다음 포커스가 이동되기 전에 약간 딜레이를 줘서 컨텐츠 업데이트가 된 후 포커스 되도록 함
    setTimeout(() => {
      secondInputRef.current?.focus();
    }, 50);
  };

  // 외부에서 focus 호출할 수 있도록
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (firstLine === '') {
        // 첫 줄이 비어있으면 첫 번째 입력 상자에 포커스
        firstInputRef.current?.focus();
      } else {
        // 첫 줄이 있으면 두 번째 입력 상자에 포커스
        secondInputRef.current?.focus();
      }
    },
  }));

  return (
    <ScrollView>
      <YStack
        flex={1}
        gap="$2"
        animation="quick"
        enterStyle={{ opacity: 0, scale: 0.95 }}
        animateOnly={['opacity', 'transform']}
      >
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* 첫 번째 줄 (큰 글씨) */}
        <Input
          unstyled
          ref={firstInputRef}
          value={firstLine}
          onChangeText={text => handleTextChange('first', text)}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="next"
          fontWeight="800"
          py="$2"
          fontSize={getToken(fontSize) * 1.4}
          color="$gray12"
          placeholder={t('placeholders.journal.title')}
          placeholderTextColor="$gray7"
          autoFocus={autoFocus}
        />

        {/* 두 번째 줄부터 (작은 글씨) */}
        <TextArea
          unstyled
          color="$gray12"
          ref={secondInputRef}
          value={restLines}
          py="$2"
          onChangeText={text => handleTextChange('rest', text)}
          fontSize={fontSize}
          placeholder={t('placeholders.journal.content')}
          placeholderTextColor="$gray7"
        />
      </YStack>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    borderRadius: 12,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
