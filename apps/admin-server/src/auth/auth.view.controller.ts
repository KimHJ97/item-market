import { Controller, Get, Render } from '@nestjs/common';

@Controller('/auth')
export class AuthViewController {
  @Get('/login')
  @Render('auth/login')
  loginView() {
    return;
  }
}
