import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConstant } from '../common';

import { Sampletable1 } from '../entities/sampledb1';
import { SimpleService } from './providers';
import { SimpleResolver } from './resolvers';
import { DateScalar } from './scalars';

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        ...config.get(GlobalConstant.GRAPH_QL),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Sampletable1]),
  ],
  providers: [SimpleResolver, SimpleService, DateScalar],
})
export class GqlModule {}
