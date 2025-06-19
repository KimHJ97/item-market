import { HttpException } from '@nestjs/common';
import { AuthErrorCodeEnum } from './code/auth-error-code.enum';
import { ManagerErrorCodeEnum } from './code/manager-error-code.enum';

const ErrorCodeEnums = [AuthErrorCodeEnum, ManagerErrorCodeEnum] as const;
type ErrorCodeEnum = (typeof ErrorCodeEnums)[number];

export interface ErrorResponse {
  status: number;
  errorCode: string;
  message: string;
}

export type ErrorCodeType = keyof ErrorCodeEnum;

export class CommonException extends HttpException {
  constructor(error: ErrorCodeType) {
    // 모든 도메인 ENUM에서 에러 세부 정보 조회
    const errorDetails = ErrorCodeEnums.reduce(
      (details, enumObj) => details || enumObj[error],
      undefined as ErrorResponse | undefined,
    );

    if (!errorDetails) {
      throw new Error(`Unknown error code: ${error as string}`);
    }

    const { errorCode, message, status } = errorDetails;
    super(
      {
        status: status,
        errorCode,
        message,
      } as ErrorResponse,
      status,
    );
  }
}
