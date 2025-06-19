import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { CommonResponse } from '../common/common.response';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<CommonResponse<LoginResponse>> {
    const rseponse = await this.authService.login(loginRequest);
    return CommonResponse.success(rseponse);
  }
}
