import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponse } from './common.exception';

export class CommonResponse<T> {
  @ApiProperty({ description: 'Indicates if the request was successful' })
  success: boolean;

  @ApiProperty({ description: 'Response data', nullable: true })
  data?: T;

  @ApiProperty({ description: 'Error details', nullable: true })
  error?: ErrorResponse;

  private constructor(success: boolean, data?: T, error?: ErrorResponse) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): CommonResponse<T> {
    return new CommonResponse(true, data);
  }

  static error<T>(error: ErrorResponse): CommonResponse<T> {
    // undefined를 T 타입으로 캐스팅하여 타입 검사 오류를 해결합니다.
    return new CommonResponse(false, undefined as T, error);
  }
}
