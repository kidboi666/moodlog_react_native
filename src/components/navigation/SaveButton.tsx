import { Button } from '../common/Button';
import { CircleCheck } from '@tamagui/lucide-icons';

export const SaveButton = () => {
  return (
    <Button>
      <Button.Icon>
        <CircleCheck />
      </Button.Icon>
      <Button.Text>완료</Button.Text>
    </Button>
  );
};
