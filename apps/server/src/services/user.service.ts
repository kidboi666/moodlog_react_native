import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // 실제 앱에서는 데이터베이스를 사용하지만, 간단한 예제를 위해 메모리에 저장
  private readonly users: any[] = [];

  async findOne(username: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    // 이미 존재하는 사용자인지 확인
    const existingUser = this.users.find(
      (user) => user.username === createUserDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 새 사용자 생성
    const newUser = {
      id: this.users.length + 1,
      username: createUserDto.username,
      password: hashedPassword,
    };

    this.users.push(newUser);

    // 비밀번호 제외하고 반환
    const { password, ...result } = newUser;
    return result;
  }
}
