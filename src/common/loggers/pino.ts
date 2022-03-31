import pino from 'pino';
import { GlobalConstant } from '../constants';

const isProduction = (process.env.NODE_ENV === GlobalConstant.ENV_NAME.prod);

export const logger = pino({
  ...(isProduction
    ? {}
    : {
      level: 'debug',
      transport: {
        // https://github.com/pinojs/pino-pretty
        target: 'pino-pretty',
      },
    }),
}, pino.multistream([
  // https://getpino.io/#/docs/asynchronous?id=usage
  { stream: pino.destination({ dest: process.stdout.fd, sync: false }) },
  { stream: pino.destination({ dest: process.stderr.fd, sync: false }), level: 'error' },
], {}));
