import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql';
import { GlobalConstant } from '../constants';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger();

  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    if (host.getType<GqlContextType>() === GlobalConstant.GRAPH_QL) {
      const gqlHost = GqlArgumentsHost.create(host);
      const { req: { body: { operationName, variables } } } = gqlHost.getContext();
      args = `${operationName} ${JSON.stringify(variables)}`;
    } else {
      super.catch(exception, host);
      // const req = host.switchToHttp().getRequest<Request>();
      // req.method, req.originalUrl...
      // args = req.body;
    }

    const status = this.getHttpStatus(exception);
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error(`${exception.message}: ${args}`, exception.stack);
      } else {
        // Error Notifications
        this.logger.error('UnhandledException', exception);
      }
    }
  }

  private getHttpStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
