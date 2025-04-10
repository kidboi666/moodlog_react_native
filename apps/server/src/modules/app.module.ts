import { Module } from '@nestjs/common'
import { AuthModule } from './auth.module'
import { UserModule } from './user.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
