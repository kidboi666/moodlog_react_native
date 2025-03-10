import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, useTheme } from 'tamagui';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDraft } from '@/store/hooks/useDraft';
import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import { useJournal } from '@/store/hooks/useJournal';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import { EnhancedTextInput } from '@/screens/write/EnhancedTextInput';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import * as S from '@/styles/write/JournalWrite.styled';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const {
    draft,
    onContentChange,
    onTimeStamp,
    onSelectionChange,
    selection,
    onImageUriChange,
    enhancedInputRef,
  } = useDraft();
  const { addJournal } = useJournal('week');
  const toast = useToastController();
  const { t } = useTranslation();
  const theme = useTheme();
  const [inputKey, setInputKey] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSubmit = useCallback(() => {
    addJournal(draft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    router.push('/(tabs)');
  }, [router, toast, draft]);

  const triggerFocus = () => {
    if (enhancedInputRef.current) {
      enhancedInputRef.current.focus();
    } else {
      setInputKey(prev => prev + 1);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={{ backgroundColor: theme.red5.val }}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -40 : 0}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={triggerFocus}
      >
        <S.ViewContainer edges={['bottom']} Header={<WriteHeader />}>
          <S.XStackContainer>
            {draft.emotion ? (
              <S.ColoredMoodBar
                moodColor={
                  emotionTheme[draft.emotion?.type][draft.emotion?.level]
                }
              />
            ) : (
              <S.UncoloredMoodBar />
            )}
            <S.TextContentBox>
              <EnhancedTextInput
                key={inputKey}
                ref={enhancedInputRef}
                imageUri={draft.imageUri}
                fontSize={fontSize}
                contentValue={draft.content}
                onContentChange={onContentChange}
                selection={selection}
                onSelectionChange={onSelectionChange}
                autoFocus={true}
              />
              <S.ButtonsViewBox>
                <S.ButtonsXStackBox>
                  <AnimatePresence>
                    {isKeyboardVisible && (
                      <>
                        <S.AddImageButton
                          onPress={onImageUriChange}
                          icon={ImagePlus}
                        />
                        <S.TimeStampButton onPress={onTimeStamp} icon={Timer} />
                      </>
                    )}
                  </AnimatePresence>
                  <S.SubmitButton onPress={handleSubmit} icon={Check} />
                </S.ButtonsXStackBox>
              </S.ButtonsViewBox>
            </S.TextContentBox>
          </S.XStackContainer>
        </S.ViewContainer>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
