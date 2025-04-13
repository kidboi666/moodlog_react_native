import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from '../dtos/create-user.dto'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      )
      return this.authService.login(user)
    } catch (error) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      )
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.create(createUserDto)
    const token = await this.authService.generateToken(user)
    return { access_token: token.access_token }
  }
}
