import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger.config';
import { setupViewEngine } from './config/view/view-engine.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CommonExceptionFilter } from './config/exception/common.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalFilters(new CommonExceptionFilter());
  setupSwagger(app);
  setupViewEngine(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
