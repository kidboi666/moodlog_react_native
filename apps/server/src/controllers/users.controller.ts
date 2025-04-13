import { Controller, Get, Param } from '@nestjs/common'
import { AuthService } from 'src/services/auth.service'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email)
  }
}
