import { Avatar, Button, H1, Paragraph, YStack } from 'tamagui';
import { User } from '@tamagui/lucide-icons';
import React from 'react';
import { UserInfo } from '@/types/entries';

interface Props {
  userInfo: UserInfo;
}

export const ProfileHeader = ({ userInfo }: Props) => {
  return (
    <YStack gap="$4" bg="$gray12" p="$4" rounded="$8">
      <Avatar self="flex-end" circular size="$10">
        <Avatar.Image
          source={{
            uri: userInfo.avatarUrl,
          }}
        />
        <Avatar.Fallback bg="$gray1">
          <Button
            unstyled
            color="$gray12"
            items="center"
            icon={<User size="$9" />}
          />
        </Avatar.Fallback>
      </Avatar>
      <YStack gap="$2">
        <H1 color="$gray1">{userInfo.userName}</H1>
        <Paragraph fontSize="$4" color="$gray11" textWrap="wrap">
          ID: {userInfo.id}
        </Paragraph>
      </YStack>
    </YStack>
  );
};
