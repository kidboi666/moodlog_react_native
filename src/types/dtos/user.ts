import { UserInfo } from '@/types/entries';

export type NewUserInfo = {} & Partial<
  Pick<UserInfo, 'email' | 'age' | 'avatarUrl'>
>;
