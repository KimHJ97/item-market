import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ManagerRepository } from '@persistence/manager/manager.repository';
import { LoginRequest } from './request/login.request';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './response/login.response';
import { JwtPayloadDto } from '../config/security/dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ManagerRepository')
    private readonly managerRepository: ManagerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    // 사용자 조회
    const findManager = await this.managerRepository.findByEmail(request.email);
    if (!findManager) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(
      request.password,
      findManager.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // JWT 페이로드
    const payload: JwtPayloadDto = {
      sub: findManager.id,
      username: findManager.name,
    };

    // 액세스 토큰 및 리프레시 토큰 생성
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '1h'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
