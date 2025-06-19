import { HttpStatus } from '@nestjs/common';

export const AuthErrorCodeEnum = {
  INVALID_CREDENTIALS: {
    errorCode: 'AUTH_001',
    message: 'Invalid credentials',
    status: HttpStatus.BAD_REQUEST,
  },
  JWT_SECRETS_NOT_CONFIGURED: {
    errorCode: 'AUTH_002',
    message: 'JWT secrets are not configured properly',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;
