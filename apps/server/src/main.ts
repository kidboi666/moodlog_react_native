import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.enableCors()

  const configService = app.get(ConfigService)
  const port = configService.get('PORT', 3000)

  await app.listen(port, () => {
    console.log(`Application running on port ${port}`)
  })
}
bootstrap()
