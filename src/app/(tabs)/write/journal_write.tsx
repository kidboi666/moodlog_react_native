import { ContentInput } from '@/components/ContentInput';
import { AnimatePresence, Button, View, XStack, YStack } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useDraft } from '@/store/hooks/useDraft';
import { Check } from '@tamagui/lucide-icons';
import { ENTER_STYLE, ENTER_STYLE_KEY, PRESS_STYLE } from '@/constants/styles';
import React from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { WriteHeader } from '@/components/layouts/headers/WriteHeader';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@tamagui/toast';
import { router } from 'expo-router';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const { draft, onContentChange } = useDraft();
  const { addJournal } = useJournal();
  const toast = useToastController();
  const { t } = useTranslation();

  const handleSubmit = () => {
    addJournal(draft);
    toast.show(t('notifications.success.journal.title'), {
      message: t('notifications.success.journal.message'),
    });
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
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
          <YStack gap="$2" flex={1}>
            <WriteHeader />
            <ContentInput
              fontSize={fontSize}
              contentValue={draft.content}
              onContentChange={onContentChange}
            />
            <View items="center">
              <AnimatePresence>
                {draft.content && (
                  <Button
                    unstyled
                    bg="$gray12"
                    rounded="$12"
                    p="$4"
                    shadowColor="#000"
                    shadowOffset={{ width: 0, height: -3 }}
                    shadowOpacity={0.05}
                    shadowRadius={3}
                    elevation={10}
                    color="$gray1"
                    icon={<Check size="$1" />}
                    onPress={handleSubmit}
                    animation="bouncy"
                    animateOnly={ENTER_STYLE_KEY}
                    pressStyle={PRESS_STYLE}
                    enterStyle={ENTER_STYLE}
                    exitStyle={ENTER_STYLE}
                  />
                )}
              </AnimatePresence>
            </View>
          </YStack>
        </XStack>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
