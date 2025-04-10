import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import type { CreateUserDto } from '../dtos/create-user.dto'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import type { UserService } from '../services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
