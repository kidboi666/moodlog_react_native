import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  // CORS 설정
  app.enableCors()

  // 환경변수에서 포트 가져오기
  const configService = app.get(ConfigService)
  const port = configService.get('PORT', 3000)

  await app.listen(port, () => {
    console.log(`Application running on port ${port}`)
  })
}
bootstrap()
