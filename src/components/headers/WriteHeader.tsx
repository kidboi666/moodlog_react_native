import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import React from 'react';
import { useJournal } from '@/store/hooks/useJournal';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { HeaderContainer } from '@/components/shared/HeaderContainer';

interface Props {
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
}

export const WriteHeader = ({ navigation }: Props) => {
  const { updateDraftEmotion, draft } = useJournal();
  return (
    <HeaderContainer>
      <XStack width="100%">
        <Button
          unstyled
          size="$4"
          justify="center"
          icon={<ChevronLeft size="$1" />}
          onPress={() => navigation.goBack()}
        />
        <XStack flex={1} items="center" gap="$2" justify="center">
          <EmotionPicker
            selectedEmotion={draft?.emotion}
            onChangeEmotion={updateDraftEmotion}
            justify="center"
          />
        </XStack>
        <ThemeToggle self="flex-end" />
      </XStack>
    </HeaderContainer>
  );
};
