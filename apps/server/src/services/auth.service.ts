import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { ValidatedUserDto } from 'src/dtos/validated-user.dto'
import { Repository } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import { User } from '../entities/user.entity'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const { password: _, ...result } = user

    return result
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    })
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      userName: createUserDto.userName,
    })

    return this.usersRepository.save(user)
  }

  async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async login(validatedUserDto: ValidatedUserDto) {
    const user = await this.usersService.findOneById(validatedUserDto.id)
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
    }
  }
}
