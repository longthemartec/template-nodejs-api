import { Global, Module } from '@nestjs/common';

import { Logger, RequestContext } from './loggers';
import * as providers from './providers';

const services = [Logger, RequestContext, ...Object.values(providers)];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule {}
