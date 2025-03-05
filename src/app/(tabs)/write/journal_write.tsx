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
import { Check, ImagePlus, Timer } from '@tamagui/lucide-icons';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { useJournal } from '@/store/hooks/useJournal';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';
import {
  EnhancedTextInput,
  EnhancedTextInputRef,
} from '@/screens/write/EnhancedTextInput';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import { CONTAINER_SPACING } from '@/constants/size';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const { draft, onContentChange, onTimeStamp, onImageUriChange } = useDraft();
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? -60 : 0}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={StyleSheet.absoluteFill}
        onPress={triggerFocus}
      >
        <Container
          gap="$3"
          pl={0}
          edges={['bottom']}
          Header={<WriteHeader pl={CONTAINER_SPACING} />}
        >
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
            <YStack gap="$6" flex={1} z={1}>
              <EnhancedTextInput
                key={inputKey}
                ref={enhancedInputRef}
                imageUri={draft.imageUri}
                fontSize={fontSize}
                contentValue={draft.content}
                onContentChange={onContentChange}
                autoFocus={true}
              />
              <View items="center">
                <XStack position="absolute" r={0} b={12} gap="$2">
                  <AnimatePresence>
                    {isKeyboardVisible && (
                      <>
                        <Button
                          animation="medium"
                          enterStyle={ENTER_STYLE}
                          exitStyle={ENTER_STYLE}
                          pressStyle={PRESS_STYLE}
                          icon={<ImagePlus size="$1" />}
                          onPress={onImageUriChange}
                          bg="$gray5"
                        />
                        <Button
                          animation="medium"
                          enterStyle={ENTER_STYLE}
                          exitStyle={ENTER_STYLE}
                          pressStyle={PRESS_STYLE}
                          onPress={onTimeStamp}
                          icon={<Timer size="$1" />}
                          bg="$gray5"
                        />
                      </>
                    )}
                  </AnimatePresence>
                  <Button
                    bg="$gray5"
                    onPress={handleSubmit}
                    icon={<Check size="$1" />}
                    animation="medium"
                    pressStyle={PRESS_STYLE}
                    enterStyle={ENTER_STYLE}
                    exitStyle={ENTER_STYLE}
                  />
                </XStack>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
