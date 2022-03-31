import { Injectable, Optional } from '../decorators';
import { HttpStatus } from '../constants';
import type { ArgumentMetadata, PipeTransform } from '../interfaces';
import { ErrorHttpStatusCode, HttpErrorByCode } from '../filters';

export interface ParseFloatPipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
}

/**
 * Defines the built-in ParseFloat Pipe
 *
 * @see [Built-in Pipes](https://docs.nestjs.com/pipes#built-in-pipes)
 *
 * @publicApi
 */
@Injectable()
export class ParseFloatPipe implements PipeTransform<string> {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() options?: ParseFloatPipeOptions) {
    options = options || {};
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
      options;

    this.exceptionFactory =
      exceptionFactory ||
      (error => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  /**
   * Method that accesses and performs optional transformation on argument for
   * in-flight requests.
   *
   * @param value currently processed route argument
   * @param _metadata contains metadata about the currently processed route argument
   */
  async transform(value: string, _metadata: ArgumentMetadata): Promise<number> {
    const isNumeric =
      ['string', 'number'].includes(typeof value) &&
      !isNaN(parseFloat(value)) &&
      isFinite(value as any);
    if (!isNumeric) {
      throw this.exceptionFactory(
        'Validation failed (numeric string is expected)',
      );
    }
    return parseFloat(value);
  }
}
