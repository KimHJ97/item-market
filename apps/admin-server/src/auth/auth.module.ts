import { Module } from '@nestjs/common';
import { AuthController } from './auth.api.controller';
import { AuthViewController } from './auth.view.controller';
import { ManagerPersistenceModule } from '@persistence/manager/manager-persistence.module';
import { AuthService } from './auth.service';
import { JwtAuthModule } from '../config/security/jwt.module';

@Module({
  imports: [JwtAuthModule, ManagerPersistenceModule],
  controllers: [AuthController, AuthViewController],
  providers: [AuthService],
})
export class AuthModule {}
