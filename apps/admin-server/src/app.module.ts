import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmModuleAsyncOptions } from '@config/database/typeorm.config';
import { ItemViewController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('1h'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
      }),
      validationOptions: {
        abortEarly: false, // 모든 검증 오류를 한꺼번에 표시
      },
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    ItemModule,
    AuthModule,
  ],
  controllers: [ItemViewController],
  providers: [],
})
export class AppModule {}
