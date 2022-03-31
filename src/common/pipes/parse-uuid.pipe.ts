import { Injectable, Optional } from '../decorators';
import { HttpStatus } from '../constants';
import type { ArgumentMetadata, PipeTransform } from '../interfaces';
import { ErrorHttpStatusCode, HttpErrorByCode, isUUID } from '../filters';

export interface ParseUUIDPipeOptions {
  version?: '3' | '4' | '5';
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (errors: string) => any;
}

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string> {
  private readonly version: "3" | "4" | "5" | undefined;
  protected exceptionFactory: (errors: string) => any;

  constructor(@Optional() options?: ParseUUIDPipeOptions) {
    options = options || {};
    const {
      exceptionFactory,
      errorHttpStatusCode = HttpStatus.BAD_REQUEST,
      version,
    } = options;

    this.version = version;
    this.exceptionFactory =
      exceptionFactory ||
      (error => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  async transform(value: string, _metadata: ArgumentMetadata): Promise<string> {
    if (!isUUID(value, this.version)) {
      throw this.exceptionFactory(
        `Validation failed (uuid ${
          this.version ? 'v' + this.version : ''
        } is expected)`,
      );
    }
    return value;
  }
}
