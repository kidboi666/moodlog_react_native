import { IsEmail, IsString } from 'class-validator'

export class ValidatedUserDto {
  @IsEmail()
  email: string

  @IsString()
  id: string
}
