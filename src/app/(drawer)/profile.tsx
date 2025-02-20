import { useState } from 'react';
import { Button, H3, Input, Text, XStack, YStack } from 'tamagui';
import { IUserInfo } from '@/types/entries';
import { useUser } from '@/store/hooks/useUser';
import { Container } from '@/components/containers/Container';
import { ProfileHeader } from '@/components/ProfileHeader';
import { useBottomModal } from '@/store/hooks/useBottomModal';
import { BottomModal } from '@/components/modals/BottomModal';

interface Props {
  onUpdateProfile: (updatedInfo: IUserInfo) => void;
}

export default function ProfilePage({ onUpdateProfile }: Props) {
  const { userInfo: initialUserInfo } = useUser();
  if (!initialUserInfo) return null;
  const { modalRef, openModal, closeModal } = useBottomModal();
  const [userInfo, setUserInfo] = useState<IUserInfo>(initialUserInfo);

  return (
    <Container>
      <YStack gap="$4">
        <ProfileHeader userInfo={userInfo} />
        {/* Edit Button */}
        <Button onPress={openModal} themeInverse mt="$2">
          Edit Profile
        </Button>

        {/* Edit Modal */}
        <BottomModal ref={modalRef}>
          <YStack gap="$4">
            <H3 fontSize="$6" fontWeight="bold">
              Profile Edit
            </H3>

            {/* Age Input */}
            <YStack gap="$2">
              <Text>나이</Text>
              <Input
                value={userInfo.age?.toString() || ''}
                onChangeText={text =>
                  setUserInfo(prev => ({
                    ...prev,
                    age: text ? parseInt(text) : undefined,
                  }))
                }
                keyboardType="numeric"
                placeholder="나이를 입력하세요"
              />
            </YStack>

            {/* Email Input */}
            <YStack gap="$2">
              <Text>이메일</Text>
              <Input
                value={userInfo.email || ''}
                onChangeText={text =>
                  setUserInfo(prev => ({
                    ...prev,
                    email: text || undefined,
                  }))
                }
                keyboardType="email-address"
                placeholder="이메일을 입력하세요"
              />
            </YStack>

            {/* Avatar URL Input */}
            <YStack gap="$2">
              <Text>프로필 이미지 URL</Text>
              <Input
                value={userInfo.avatarUrl || ''}
                onChangeText={text =>
                  setUserInfo(prev => ({
                    ...prev,
                    avatarUrl: text || undefined,
                  }))
                }
                placeholder="이미지 URL을 입력하세요"
              />
            </YStack>

            {/* Save Button */}
            <Button onPress={closeModal} theme="active" mt="$2">
              저장하기
            </Button>
          </YStack>
        </BottomModal>

        {/* Profile Info Display */}
        <YStack gap="$4" mt="$4">
          <XStack gap="$2">
            <Text fontWeight="bold" width={80}>
              Age:
            </Text>
            <Text>{userInfo.age || '미입력'}</Text>
          </XStack>

          <XStack gap="$2">
            <Text fontWeight="bold" width={80}>
              Email:
            </Text>
            <Text>{userInfo.email || '미입력'}</Text>
          </XStack>

          <XStack gap="$2">
            <Text fontWeight="bold" width={80}>
              Loggin Method:
            </Text>
            <Text>{userInfo.provider || '일반'}</Text>
          </XStack>
        </YStack>
      </YStack>
    </Container>
  );
}
