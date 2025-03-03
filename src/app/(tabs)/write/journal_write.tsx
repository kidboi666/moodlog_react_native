import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, Button, View, XStack, YStack } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';
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
import { Check, Timer } from '@tamagui/lucide-icons';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import { useJournal } from '@/store/hooks/useJournal';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '@/screens/write/EnhancedTextInput';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const { draft, onContentChange } = useDraft();
  const { addJournal } = useJournal();
  const toast = useToastController();
  const { t } = useTranslation();
  const [inputKey, setInputKey] = useState(0);
  const enhancedInputRef = useRef<EnhancedTextInputRef>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleSubmit = () => {
    addJournal(draft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    router.replace('/(tabs)');
  };

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
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={triggerFocus}
      >
        <Container gap="$3" pl={0} edges={['top']}>
          <XStack flex={1} gap="$3">
            {draft.emotion ? (
              <View
                width="3%"
                height="100%"
                borderTopRightRadius="$4"
                borderBottomRightRadius="$4"
                bg={emotionTheme[draft.emotion?.type][draft.emotion?.level]}
              />
            ) : (
              <View
                width="3%"
                height="100%"
                borderTopRightRadius="$4"
                bg="$gray8"
              />
            )}
            <YStack gap="$2" flex={1} z={1}>
              <WriteHeader />
              <EnhancedTextInput
                key={inputKey}
                ref={enhancedInputRef}
                fontSize={fontSize}
                contentValue={draft.content}
                onContentChange={onContentChange}
                autoFocus={true}
              />
              <View items="center">
                <AnimatePresence>
                  {isKeyboardVisible && (
                    <XStack
                      r={0}
                      position="absolute"
                      b={12}
                      gap="$2"
                      animation="medium"
                      enterStyle={ENTER_STYLE}
                      exitStyle={ENTER_STYLE}
                      pressStyle={PRESS_STYLE}
                    >
                      <Button
                        icon={<Check size="$1" />}
                        onPress={handleSubmit}
                        animation="medium"
                        bg="$gray5"
                        animateOnly={ENTER_STYLE_KEY}
                        pressStyle={PRESS_STYLE}
                        enterStyle={ENTER_STYLE}
                        exitStyle={ENTER_STYLE}
                      />
                      <Button icon={<Timer size="$1" />} bg="$gray5" />
                    </XStack>
                  )}
                </AnimatePresence>
              </View>
            </YStack>
          </XStack>
        </Container>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
