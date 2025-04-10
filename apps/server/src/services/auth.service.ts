import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginDto } from '../dtos/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOne(username)
      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (isPasswordMatch) {
        const { password, ...result } = user
        return result
      }

      return null
    } catch (error) {
      return null
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // JWT를 사용하지 않는 간단한 예제이므로 토큰 대신 사용자 정보만 반환
    return {
      user,
      // 실제 앱에서는 JWT 토큰을 여기서 생성하여 반환
      token: `fake-jwt-token-${user.id}`,
    }
  }
}
