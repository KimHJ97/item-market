import { HttpStatus } from '@nestjs/common';

export const ManagerErrorCodeEnum = {
  NOT_FOUND_MANAGER: {
    errorCode: 'MANAGER_001',
    message: 'Not Found Manager',
    status: HttpStatus.BAD_REQUEST,
  },
} as const;
