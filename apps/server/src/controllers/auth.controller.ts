import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from 'src/dtos/login.dto'
import { CreateUserDto } from '../dtos/create-user.dto'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      )
      const { id, email } = user
      return this.authService.login({ id, email })
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.create(createUserDto)
    const { id, email, userName } = user
    const token = await this.authService.login({ id, email })
    return {
      access_token: token.access_token,
      user: {
        id,
        email,
        userName,
      },
    }
  }
}
