import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button, XStack } from 'tamagui';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { EmotionPicker } from '@/components/emotion/EmotionPicker';
import React from 'react';
import { useDiary } from '@/store/useDiary';
import { ThemeToggle } from '../ThemeToggle';
import { HeaderContainer } from '@/components/share/HeaderContainer';

interface Props {
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
}

export const WriteHeader = ({ navigation }: Props) => {
  const { updateDraftEmotion, draftJournal } = useDiary();
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
            selectedEmotion={draftJournal.emotion}
            onChangeEmotion={updateDraftEmotion}
            justify="center"
          />
        </XStack>
        <ThemeToggle self="flex-end" />
      </XStack>
    </HeaderContainer>
  );
};
