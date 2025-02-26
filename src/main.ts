import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Swagger from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log(process.env.PORT)
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await Swagger(app);
  const configService = app.get(ConfigService);
  console.log(configService.getOrThrow('port'))
  console.log(configService.getOrThrow('PORT'))
  await app.listen(configService.getOrThrow('port'));
}
bootstrap();
