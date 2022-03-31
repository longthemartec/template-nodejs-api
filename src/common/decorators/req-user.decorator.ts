import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import { GlobalConstant } from '../constants';

export const ReqUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  console.log(data);
  let request: Request;
  if (context.getType<GqlContextType>() === GlobalConstant.GRAPH_QL) {
    const ctx = GqlExecutionContext.create(context).getContext();
    request = <Request>ctx.req;
  } else {
    request = context.switchToHttp().getRequest<Request>();
  }
  return request.user;
});
