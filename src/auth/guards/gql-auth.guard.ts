import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // console.log('GraphQL Request Object:', req);

    if (!req) {
      throw new Error(
        'Request object is undefined. Ensure context is properly configured in GraphQLModule.',
      );
    }

    return req;
  }
}
