import { RequestContext } from './request-context';
import { GlobalConstant } from '../constants';
import { ConsoleLogger as NestConsoleLogger, ConsoleLoggerOptions, Injectable, Scope } from '@nestjs/common';

/**
 * https://docs.nestjs.com/techniques/logger
 * To disable color in the default logger's messages, set the `NO_COLOR` environment variable to some non-empty string.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class ConsoleLogger extends NestConsoleLogger {
  protected isProduction: boolean = process.env.NODE_ENV === GlobalConstant.ENV_NAME.prod;
  /**
   * override options in console class
   * @protected
   */
  protected override options: ConsoleLoggerOptions = {
    logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
    timestamp: !this.isProduction,
  };

  /**
   * constructor method of this class
   * @param req
   * @param context
   */
  constructor(private req: RequestContext, context: string) {
    super(context);
  }

  /**
   * get request context
   * @private
   */
  private get reqContext(): string {
    return this.req.context?.id || '';
  }

  /**
   * override console log function
   * @param {*} message
   * @param {*} optionalParams
   */
  public override log(message: unknown, ...optionalParams: unknown[]): void {
    super.log(message, ...this.parseContext(optionalParams));
  }

  /**
   * override console warn function
   * @param {*} message
   * @param {*} optionalParams
   */
  public override warn(message: unknown, ...optionalParams: unknown[]): void {
    super.warn(message, ...this.parseContext(optionalParams));
  }

  /**
   * override console error function
   * @param {*} message
   * @param {*} optionalParams
   */
  public override error(message: unknown, ...optionalParams: unknown[]): void {
    super.error(message, ...this.parseContext(optionalParams));
  }

  /**
   * get time stamp at current
   * @protected
   */
  protected override getTimestamp(): string {
    // When you want to change or remove the date format
    // return this.isProduction ? '' : super.getTimestamp();
    return super.getTimestamp();
  }

  /**
   * parse context
   * @param {*} params
   * @private
   */
  private parseContext(params: unknown[]): unknown[] {
    if (this.reqContext) {
      let context = this.reqContext;

      if (this.context) {
        context += `] [${this.context}`;
      }
      params.push(context);
    }
    return params;
  }
}
