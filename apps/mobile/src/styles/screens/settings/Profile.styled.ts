import {
  Button,
  H3,
  Input,
  Paragraph,
  Separator,
  Text,
  XStack,
  YStack,
  styled,
} from 'tamagui'

// 스타일 컴포넌트 정의
export const ProfileContainer = styled(YStack, {
  gap: '$4',
  mb: '$4',
})

export const SectionTitle = styled(H3, {
  // 필요한 추가 스타일 속성 설정 가능
})

export const ProfileDivider = styled(Separator, {
  // 필요한 추가 스타일 속성 설정 가능
})

export const ProfileSectionContainer = styled(YStack, {
  gap: '$6',
})

export const ProfileItemContainer = styled(YStack, {
  gap: '$2',
})

export const ProfileLabel = styled(Text, {
  color: '$gray11',
})

export const ProfileValue = styled(Paragraph, {
  // 필요한 추가 스타일 속성 설정 가능
})

export const ProfileInput = styled(Input, {
  // 필요한 추가 스타일 속성 설정 가능
})

export const ButtonContainer = styled(YStack, {
  space: '$4',
  mt: '$4',
})

export const ActionButtonsContainer = styled(XStack, {
  space: '$4',
})

export const EditButton = styled(Button, {
  // 필요한 추가 스타일 속성 설정 가능
})

export const CancelButton = styled(Button, {
  flex: 1,
  variants: {
    variant: {
      outlined: true,
    },
  },
})

export const SaveButton = styled(Button, {
  flex: 1,
  themeInverse: true,
})
