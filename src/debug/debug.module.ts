import { Module, DynamicModule } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DebugExplorer } from './debug.explorer';
import { GlobalConstant } from '../common';

@Module({})
export class DebugModule {
  public static forRoot(): DynamicModule {
    if (process.env.NODE_ENV === GlobalConstant.ENV_NAME.prod) {
      return { module: DebugModule };
    }

    return {
      module: DebugModule,
      imports: [DiscoveryModule],
      providers: [DebugExplorer],
    };
  }
}
