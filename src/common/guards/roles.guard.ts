import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { GlobalConstant } from '../constants';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(GlobalConstant.META_KEY_NAME.role, [
      context.getHandler(), // Method Roles
      context.getClass(), // Controller Roles
    ]);

    if (!roles) {
      return true;
    }

    let request: Request;
    if (context.getType<GqlContextType>() === GlobalConstant.GRAPH_QL) {
      const ctx = GqlExecutionContext.create(context).getContext();
      request = <Request>ctx.req;
    } else {
      request = context.switchToHttp().getRequest<Request>();
    }

    const { user } = request;
    if (!user) {
      return false;
    }

    return user.roles.some((role: string) => roles.includes(role));
  }
}
