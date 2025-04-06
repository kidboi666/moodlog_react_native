import { HeaderContainer as HOSHeaderContainer } from '@/core/components/shared/HeaderContainer.styleable';
import { PressableButton } from '@/core/components/shared/PressableButton.styled';
import { RenderDate } from '@/core/components/shared/RenderDate.styleable';
import { RenderDay } from '@/core/components/shared/RenderDay.styleable';
import { RenderTime } from '@/core/components/shared/RenderTime.styleable';
import { CONTAINER_HORIZONTAL_PADDING } from '@/core/constants/size';
import { styled, XStack, YStack } from 'tamagui';

export const HeaderContainer = styled(HOSHeaderContainer, {
  items: 'center',
  pl: CONTAINER_HORIZONTAL_PADDING,
});

export const DateContainer = styled(YStack, {
  items: 'center',
});

export const TimeText = styled(RenderTime, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayText = styled(RenderDay, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DateText = styled(RenderDate, {
  color: '$gray8',
  fontSize: '$5',
  fontWeight: '800',
});

export const DayWithTimeBox = styled(XStack, {
  gap: '$2',
});

export const BackButton = styled(PressableButton);

export const DeleteButton = styled(PressableButton);
