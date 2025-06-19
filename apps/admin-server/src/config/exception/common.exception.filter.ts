import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { CommonException, ErrorResponse } from '../../common/common.exception';
import { CommonResponse } from '../../common/common.response';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter {
  catch(exception: CommonException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as ErrorResponse;

    response.status(status).json(CommonResponse.error(errorResponse));
  }
}
