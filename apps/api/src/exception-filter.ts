import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { randomBytes } from 'crypto';
import { PinoLogger } from '@novu/application-generic';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly pinoLogger: PinoLogger) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.getResponseMetadata(exception);
    const responseStatus: ErrorDto = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      responseStatus.errorId = generateUUID();
      this.pinoLogger.error(
        `[${responseStatus.errorId}] Service thrown an unexpected exception: `,
        formatError(exception)
      );
    }

    response.status(status).json(responseStatus);
  }

  private getResponseMetadata(exception: unknown) {
    let status: number;
    let message: string | object;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();

      return { status, message };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `Internal server error, contact support and provide them with the error_id
      }]`,
    };
  }
}
function generateUUID(): string {
  // Generate a random 4-byte hex string
  const randomHex = () => randomBytes(2).toString('hex');

  // Construct the UUID using the random hex values
  return `${randomHex()}${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}${randomHex()}${randomHex()}`;
}
function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `
      Error: ${error.message}
      Stack: ${error.stack || 'No stack trace available'}
    `;
  } else {
    return `
      Unknown error: ${JSON.stringify(error, null, 2)}
    `;
  }
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ErrorDto {
  statusCode: number;
  timestamp: string;
  errorId?: string;
  path: string;
  message: string | object;
}
