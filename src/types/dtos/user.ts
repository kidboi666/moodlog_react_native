import { IUserInfo } from '../entries';

export type UserInfo = {} & Pick<IUserInfo, 'userName' | 'email' | 'age'>;
