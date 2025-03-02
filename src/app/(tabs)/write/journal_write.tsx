import { ContentInput } from '@/components/ContentInput';
import { AnimatePresence, Button, View, XStack, YStack } from 'tamagui';
import { Container } from '@/components/layouts/containers/Container';
import { useApp } from '@/store/hooks/useApp';
import { emotionTheme } from '@/constants/themes';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useDraft } from '@/store/hooks/useDraft';
import { ArrowLeft, Check } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { ENTER_STYLE, PRESS_STYLE, PRESS_STYLE_KEY } from '@/constants/styles';
import React, { useState } from 'react';
import { useToastController } from '@tamagui/toast';
import { useTranslation } from 'react-i18next';

export default function JournalWriteScreen() {
  const { fontSize } = useApp();
  const toast = useToastController();
  const { t } = useTranslation();
  const [key, setKey] = useState(0);
  const { draft, onTitleChange, onContentChange, onDraftSubmit } = useDraft();

  const handleSubmit = () => {
    onDraftSubmit(draft);

    if (!draft.emotion?.type) {
      toast.show(t('notifications.warning.emotion.title'), {
        message: t('notifications.warning.emotion.message'),
        duration: 2000,
      });
    }
  };

  return (
    <KeyboardAvoidingView key={key} style={styles.container}>
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
            <XStack justify="space-between">
              <Button
                p="$2"
                unstyled
                rounded="$2"
                animation="quick"
                animateOnly={PRESS_STYLE_KEY}
                icon={<ArrowLeft size="$1" />}
                onPress={() => router.back()}
                pressStyle={PRESS_STYLE}
              />
              <AnimatePresence>
                {draft.content && draft.title && (
                  <Button
                    unstyled
                    bg="$background"
                    themeInverse
                    px="$4"
                    justify="center"
                    icon={Check}
                    rounded="$4"
                    color="$color"
                    disabled={!draft?.content}
                    animation="quick"
                    animateOnly={PRESS_STYLE_KEY}
                    pressStyle={PRESS_STYLE}
                    enterStyle={ENTER_STYLE}
                    exitStyle={ENTER_STYLE}
                    onPress={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </XStack>
            <ContentInput
              fontSize={fontSize}
              contentValue={draft.content}
              titleValue={draft.title}
              onContentChange={onContentChange}
              onTitleChange={onTitleChange}
            />
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
