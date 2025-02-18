import { ContentInput } from '@/components/ContentInput';
import { Button, Form, Separator, XStack, YStack } from 'tamagui';
import { useJournal } from '@/store/hooks/useJournal';
import { Check } from '@tamagui/lucide-icons';
import { Container } from '@/components/containers/Container';
import { useToastController } from '@tamagui/toast';
import { ENTER_STYLE, PRESS_STYLE } from '@/constants/styles';
import { useApp } from '@/store/hooks/useApp';

export default function WriteScreen() {
  const { fontSize } = useApp();
  const toast = useToastController();
  const { addJournal, draft, updateDraftContent, updateDraftTitle } =
    useJournal();

  const handleSubmit = () => {
    if (!draft.emotion?.type) {
      toast.show('Select the emotional intensity!', {
        message: 'No emotional intensity selected',
      });
    }
    addJournal(draft);
  };

  return (
    <Container>
      <YStack flex={1} gap="$3">
        <XStack flex={1} gap="$4" ml="$2">
          <Separator vertical />
          <Form onSubmit={handleSubmit} gap="$4" flex={1}>
            <ContentInput
              fontSize={fontSize}
              contentValue={draft.content}
              titleValue={draft.title}
              onChangeContentText={updateDraftContent}
              onChangeTitleText={updateDraftTitle}
            />
            <Form.Trigger asChild disabled={!draft?.content || !draft?.emotion}>
              {draft.content && (
                <Button
                  bg="$background"
                  mb="$2"
                  animation="quick"
                  themeInverse
                  self="flex-end"
                  disabled={!draft.content}
                  icon={Check}
                  color="$color"
                  opacity={!draft.content ? 0.5 : 1}
                  pressStyle={PRESS_STYLE}
                  enterStyle={{ ...ENTER_STYLE, y: -10 }}
                />
              )}
            </Form.Trigger>
          </Form>
        </XStack>
      </YStack>
    </Container>
  );
}
