import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { KeyboardAvoidingView, Platform } from 'react-native';

import { Form, XStack, useTheme } from 'tamagui';

import { ActionButtons } from '@/core/components/modals/contents/JournalWriteModal/components/ActionButtons';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '@/core/components/modals/contents/JournalWriteModal/components/EnhancedTextInput';
import { KEYBOARD_VERTICAL_OFFSET } from '@/core/constants/size';
import { moodTheme } from '@/core/constants/themes';
import { ImageService } from '@/core/services/image.service';

import { Draft } from '@/types/journal.types';
import { MoodLevel, MoodType } from '@/types/mood.types';

import * as S from './JournalWriteModal.styled';

interface Props {
  moodType: MoodType;
  moodLevel: MoodLevel;
  isLoading: boolean;
  isSubmitted: boolean;
  onSubmit: (draft: Draft) => void;
}

export const JournalWriteModal = ({
  moodType,
  moodLevel,
  isLoading,
  isSubmitted,
  onSubmit,
}: Props) => {
  const theme = useTheme();
  const [draft, setDraft] = useState<Draft>({
    content: '',
    mood: {
      type: moodType,
      level: moodLevel,
    },
    imageUri: [],
  });
  const inputRef = useRef<EnhancedTextInputRef>(null);

  const handleContentChange = useCallback((content: string) => {
    setDraft(prev => ({ ...prev, content }));
  }, []);

  const handleImageUriChange = useCallback(async () => {
    try {
      const newFilePath = await ImageService.createNewFileName();

      setDraft(prev =>
        newFilePath
          ? { ...prev, imageUri: [...prev.imageUri, newFilePath] }
          : prev,
      );
    } catch (err) {
      console.error('Image saving error ', err);
      return null;
    }
  }, []);

  const handleTimeStamp = useCallback(() => {
    inputRef.current?.insertCurrentTime();
  }, [inputRef]);

  const contentContainerStyle = useMemo(
    () => ({
      backgroundColor: theme.red5.val,
      flex: 1,
    }),
    [theme.red5.val],
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, []);

  return (
    <S.BottomSheetContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={contentContainerStyle}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <S.XStackContainer>
          <Form flex={1} gap="$4" onSubmit={() => onSubmit(draft)}>
            <XStack flex={1} gap="$4">
              {draft.mood ? (
                <S.ColoredMoodBar
                  moodColor={moodTheme[draft.mood.type][draft.mood.level]}
                />
              ) : (
                <S.UncoloredMoodBar />
              )}
              <EnhancedTextInput
                ref={inputRef}
                imageUri={draft.imageUri}
                contentValue={draft.content}
                onContentChange={handleContentChange}
              />
            </XStack>
            <S.ButtonsViewBox>
              <ActionButtons
                isSubmitted={isSubmitted}
                isLoading={isLoading}
                onTimeStamp={handleTimeStamp}
                onImageUriChange={handleImageUriChange}
                content={draft.content}
              />
            </S.ButtonsViewBox>
          </Form>
        </S.XStackContainer>
      </KeyboardAvoidingView>
    </S.BottomSheetContainer>
  );
};
