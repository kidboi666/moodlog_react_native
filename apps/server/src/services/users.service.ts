import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import type { CreateUserDto } from '../dtos/create-user.dto'

@Injectable()
export class UsersService {
  private readonly users: any[] = []

  async findOneByEmail(email: string): Promise<any> {
    const user = this.users.find(user => user.email === email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = this.users.find(
      user => user.email === createUserDto.email,
    )
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const newUser = {
      id: this.users.length + 1,
      email: createUserDto.email,
      password: hashedPassword,
    }

    this.users.push(newUser)

    const { password, ...result } = newUser
    return result
  }
}
